import assert from "assert";
import { describe } from "mocha";
import parseAddress from ".";

describe("IPv4", () => {
    it("should parse IPv4 addresses", () => {
        assert.deepStrictEqual(parseAddress("127.0.0.1:80", "ipv4"), {
            address: "127.0.0.1",
            family: "ipv4",
            port: 80,
        });
    });

    it("should not parse IPv6 addresses", () => {
        assert.strictEqual(parseAddress("[::1]:80", "ipv4"), null);
    });

    it("should not parse invalid IPv4 addresses", () => {
        assert.strictEqual(parseAddress("zxvzxcvzxcv:80", "ipv4"), null);
    });
});

describe("IPv6", () => {
    it("should parse IPv6 addresses", () => {
        assert.deepStrictEqual(parseAddress("[::1]:80", "ipv6"), {
            address: "::1",
            family: "ipv6",
            port: 80,
        });
    });

    it("should not parse IPv4 addresses", () => {
        assert.strictEqual(parseAddress("127.0.0.1:80", "ipv6"), null);
    });

    it("should not parse invalid IPv6 addresses", () => {
        assert.strictEqual(parseAddress("[zxvzxcvzxcv]:80", "ipv6"), null);
    });
});

describe("Both", () => {
    it("should parse IPv4 addresses", () => {
        assert.deepStrictEqual(parseAddress("127.0.0.1:80"), {
            address: "127.0.0.1",
            family: "ipv4",
            port: 80,
        });
    });

    it("should parse IPv6 addresses", () => {
        assert.deepStrictEqual(parseAddress("[::1]:80"), {
            address: "::1",
            family: "ipv6",
            port: 80,
        });
    });

    it("should not parse invalid addresses", () => {
        assert.strictEqual(parseAddress("zxvzxcvzxcv:80"), null);
    });
});