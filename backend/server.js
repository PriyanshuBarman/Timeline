import http from "http";
import puppeteer from "puppeteer";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  if (req.url === "/screenshot" && req.method === "GET") {
    try {
      const browser = await puppeteer.launch({
        headless: "new",
      });
      const page = await browser.newPage();

      await page.goto("http://127.0.0.1:5500/Timeline/frontend/index.html", {
        waitUntil: "networkidle2",
      });

      const screenshotBuffer = await page.screenshot({
        type: "png",
        fullPage: true,
      });

      await browser.close();

      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": screenshotBuffer.length,
      });
      res.end(screenshotBuffer);
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "Failed to take screenshot",
          details: err.message,
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
