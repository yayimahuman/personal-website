export default {
	async fetch(request, env) {
		const {pathname} = new URL(request.url);

		// The PATH dashboard used to live here; it's now its own app
		if (pathname === "/path" || pathname.startsWith("/path/")) {
			return Response.redirect(`https://transit.harrytong.com${pathname}`, 302);
		}

		if (pathname === "/resume.pdf") {
			const resume = await env.FILES.get("resume.pdf");
			if (!resume) return new Response("Resume not available", {status: 404});
			return new Response(resume.body, {
				headers: {
					"content-type": "application/pdf",
					"content-disposition": 'inline; filename="Harry Tong Resume.pdf"',
					// Keep it withdrawable: no search indexing, no lingering caches
					"x-robots-tag": "noindex, noarchive",
					"cache-control": "no-store",
				},
			});
		}

		// Files kept out of the public repo (e.g. licensed fonts), served from R2
		if (pathname.startsWith("/files/")) {
			const file = await env.FILES.get(decodeURIComponent(pathname.slice("/files/".length)));
			if (!file || pathname === "/files/resume.pdf") return new Response("Not found", {status: 404});
			const headers = new Headers({"cache-control": "public, max-age=604800"});
			file.writeHttpMetadata(headers);
			return new Response(file.body, {headers});
		}

		return env.ASSETS.fetch(request);
	},
};
