const arpScanner = require('arpscan/promise');
const config = require('./config');

const ILJA_MAC_ADDRESS = '40:83:1D:21:F9:A5';
const STEFANIE_MAC_ADDRESS = 'C4:93:D9:51:90:99';

class API {
  constructor() {
    this.scanWifi();
    this.wifiConnections = [];
  }

  async scanWifi(options = {}) {
    this.wifiConnections = await arpScanner(options);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('====================================');
    console.log(this.wifiConnections);
    console.log('====================================');
    await this.scanWifi();
  }
}

module.exports = new API();
