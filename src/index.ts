import { AddressInfo, isIPv4, isIPv6 } from 'net';

type IPFamily = 'ipv4' | 'ipv6';

// Try to parse the address as an IPv6 address
function tryIPv6(input: string): AddressInfo | null {
    const matches = /^\[([0-9a-f:]+)\]:(\d+)$/i.exec(input);

    if (!matches) {
        return null;
    }

    if (!isIPv6(matches[1])) {
        return null;
    }

    const address = matches[1];
    const port = parseInt(matches[2], 10);

    return { address, family: 'ipv6', port };
}

// Try to parse the address as an IPv4 address
function tryIPv4(input: string): AddressInfo | null {
    const matches = /^([0-9.]+):(\d+)$/.exec(input);

    if (!matches) {
        return null;
    }

    if (!isIPv4(matches[1])) {
        return null;
    }

    const address = matches[1];
    const port = parseInt(matches[2], 10);

    return { address, family: 'ipv4', port };
}

// Try to parse an address as either an IPv4 or IPv6 address
export default function parseAddress(input: string, family?: IPFamily): AddressInfo | null {
    return ((!family || family === 'ipv6') && tryIPv6(input))
        || ((!family || family === 'ipv4') && tryIPv4(input))
        || null;
}