import fastify from "fastify";
import proxy from "@fastify/http-proxy";
import rateLimit from "@fastify/rate-limit";

const server = fastify();

server.register(rateLimit, {
	max: 5000,
	timeWindow: 1000 * 60
});

server.register(proxy, {
	upstream: "http://aob:80",
	prefix: "/api",
	websocket: true,
});

server.register(proxy, {
	upstream: "http://duplo:80",
	prefix: "/duplo",
	websocket: true,
});

server.register(proxy, {
	upstream: "http://vue:8080",
	websocket: true,
});

server.listen({port: 80, host: "0.0.0.0"}, (err, address) => {
	if(err) throw err;
	console.log("Proxy is ready.");
});
