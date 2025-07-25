'use strict';

const { release: { version } } = require('./package.json');

module.exports.RELEASE = version;
module.exports.PORT = process.env.PORT || '51821';
module.exports.WEBUI_HOST = process.env.WEBUI_HOST || '0.0.0.0';
module.exports.PASSWORD_HASH = process.env.PASSWORD_HASH;
module.exports.MAX_AGE = parseInt(process.env.MAX_AGE, 10) * 1000 * 60 || 0;
module.exports.WG_PATH = process.env.WG_PATH || '/etc/wireguard/';
module.exports.WG_DEVICE = process.env.WG_DEVICE || 'eth0';
module.exports.WG_HOST = process.env.WG_HOST;
module.exports.WG_PORT = process.env.WG_PORT || '51820';
module.exports.WG_CONFIG_PORT = process.env.WG_CONFIG_PORT || process.env.WG_PORT || '51820';
module.exports.WG_MTU = process.env.WG_MTU || null;
module.exports.WG_PERSISTENT_KEEPALIVE = process.env.WG_PERSISTENT_KEEPALIVE || '0';
module.exports.WG_DEFAULT_ADDRESS = process.env.WG_DEFAULT_ADDRESS || '10.8.0.x';
module.exports.WG_DEFAULT_DNS = typeof process.env.WG_DEFAULT_DNS === 'string'
  ? process.env.WG_DEFAULT_DNS
  : '1.1.1.1';
module.exports.WG_ALLOWED_IPS = process.env.WG_ALLOWED_IPS || '0.0.0.0/0, ::/0';

module.exports.WG_PRE_UP = process.env.WG_PRE_UP || '';
module.exports.WG_POST_UP = process.env.WG_POST_UP || `
iptables -t nat -A POSTROUTING -s ${module.exports.WG_DEFAULT_ADDRESS.replace('x', '0')}/24 -o ${module.exports.WG_DEVICE} -j MASQUERADE;
iptables -A INPUT -p udp -m udp --dport ${module.exports.WG_PORT} -j ACCEPT;
iptables -A FORWARD -i wg0 -j ACCEPT;
iptables -A FORWARD -o wg0 -j ACCEPT;
`.split('\n').join(' ');

module.exports.WG_PRE_DOWN = process.env.WG_PRE_DOWN || '';
module.exports.WG_POST_DOWN = process.env.WG_POST_DOWN || `
iptables -t nat -D POSTROUTING -s ${module.exports.WG_DEFAULT_ADDRESS.replace('x', '0')}/24 -o ${module.exports.WG_DEVICE} -j MASQUERADE;
iptables -D INPUT -p udp -m udp --dport ${module.exports.WG_PORT} -j ACCEPT;
iptables -D FORWARD -i wg0 -j ACCEPT;
iptables -D FORWARD -o wg0 -j ACCEPT;
`.split('\n').join(' ');
module.exports.LANG = process.env.LANG || 'en';
module.exports.UI_TRAFFIC_STATS = process.env.UI_TRAFFIC_STATS || 'false';
module.exports.UI_CHART_TYPE = process.env.UI_CHART_TYPE || 0;
module.exports.WG_ENABLE_ONE_TIME_LINKS = process.env.WG_ENABLE_ONE_TIME_LINKS || 'false';
module.exports.UI_ENABLE_SORT_CLIENTS = process.env.UI_ENABLE_SORT_CLIENTS || 'false';
module.exports.WG_ENABLE_EXPIRES_TIME = process.env.WG_ENABLE_EXPIRES_TIME || 'false';
module.exports.ENABLE_PROMETHEUS_METRICS = process.env.ENABLE_PROMETHEUS_METRICS || 'false';
module.exports.PROMETHEUS_METRICS_PASSWORD = process.env.PROMETHEUS_METRICS_PASSWORD;

module.exports.DICEBEAR_TYPE = process.env.DICEBEAR_TYPE || false;
module.exports.USE_GRAVATAR = process.env.USE_GRAVATAR || false;

const crypto = require('crypto');

function getRandomInt(min, max) {
  return crypto.randomInt(min, max + 1);
}

function getRandomUint32() {
  return crypto.randomBytes(4).readUInt32LE(0);
}

module.exports.JC = parseInt(process.env.JC, 10) || 4;
module.exports.JMIN = parseInt(process.env.JMIN, 10) || getRandomInt(5, 20);
module.exports.JMAX = parseInt(process.env.JMAX, 10) || getRandomInt(30, 100);

module.exports.S1 = parseInt(process.env.S1, 10) || getRandomInt(1, 9999);
module.exports.S2 = parseInt(process.env.S2, 10) || getRandomInt(1, 9999);

module.exports.H1 = parseInt(process.env.H1, 10) || getRandomUint32();
module.exports.H2 = parseInt(process.env.H2, 10) || getRandomUint32();
module.exports.H3 = parseInt(process.env.H3, 10) || getRandomUint32();
module.exports.H4 = parseInt(process.env.H4, 10) || getRandomUint32();
