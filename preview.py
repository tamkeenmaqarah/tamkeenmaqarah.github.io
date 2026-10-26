"""Local preview: public data is proxied because the API only allows the deployed origin."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from subprocess import run, CalledProcessError
import argparse

ROOT = Path(__file__).resolve().parent
UPSTREAM = "https://tamkeen-maqraah-learning.modest-mink-0683.chatgpt.site"


class Preview(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/data":
            try:
                response = run(["curl", "--fail", "--silent", "--show-error", "--max-time", "15", UPSTREAM + "/api/data"], capture_output=True, check=True)
                self.send_body(response.stdout, "application/json")
            except CalledProcessError:
                self.send_body(b'{"error":"Public data is unavailable. Please try again."}', "application/json", 502)
        elif self.path.split("?", 1)[0] == "/app.js":
            # The deployed application keeps its existing API origin.
            source = (ROOT / "app.js").read_text().replace(UPSTREAM, "")
            self.send_body(source.encode(), "text/javascript; charset=utf-8")
        elif self.path.startswith("/api/"):
            self.send_error(405, "Local preview supports public reads only")
        else:
            super().do_GET()

    def send_body(self, body, content_type, status=200):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=4174)
    args = parser.parse_args()
    print(f"Preview: http://127.0.0.1:{args.port}", flush=True)
    ThreadingHTTPServer(("127.0.0.1", args.port), partial(Preview, directory=str(ROOT))).serve_forever()
