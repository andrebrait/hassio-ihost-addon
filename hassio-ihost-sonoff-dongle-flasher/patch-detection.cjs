const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function replace(source, from, to) {
    assert.equal(source.split(from).length - 1, 1, `Unsupported upstream detection hook: ${from}`);
    return source.replace(from, to);
}

// shortcut: these hooks target the pinned 1.3.4 controllers; recheck them when upgrading upstream.
const statePath = path.join('src', 'controllers', 'state.js');
let state = fs.readFileSync(statePath, 'utf8');
state = replace(state,
    'async function state(_0x15a9eb,_0x2ce2ef){',
    "async function state(_0x15a9eb,_0x2ce2ef){if(!await require('../../port-owner.cjs').guardSerialPort(_0x15a9eb.query?.serialPortPath,_0x2ce2ef))return;",
);

const hardwarePath = path.join('src', 'controllers', 'hardware.js');
let hardware = fs.readFileSync(hardwarePath, 'utf8');
hardware = replace(hardware,
    'async function hardware(_0x38bb92,_0x33434e){',
    "async function hardware(_0x38bb92,_0x33434e){if(!await require('../../port-owner.cjs').guardSerialPort(_0x38bb92.body?.data?.serialPortPath??require('../constants').SERIAL_PORT_PATH.IHOST_MG21,_0x33434e))return;",
);
hardware = replace(hardware,
    'getDongleEMG21FirmwareVersion=async(_0x3fe188,_0x24ef15)=>{',
    "getDongleEMG21FirmwareVersion=async(_0x3fe188,_0x24ef15)=>{if(judgeIsZBDongleE(_0x24ef15)||judgeIsDongleLMG21(_0x24ef15)||judgeIsDonglePMG24(_0x24ef15)){const detected=await require('../../probe-firmware.cjs').probeUsbFirmware(_0x3fe188);if(detected)return detected;}",
);
hardware = replace(hardware,
    'catch(_0x493370){',
    'catch(_0x493370){if([10001,10002].includes(_0x493370.code)){_0x33434e.json({error:_0x493370.code,msg:_0x493370.message});return;}',
);

const bootloaderPath = path.join('src', 'utils', 'bootloader', 'bootloader.js');
let bootloader = fs.readFileSync(bootloaderPath, 'utf8');
bootloader = replace(bootloader,
    '_0x599538=_0x3c7e30[_0x2d586a(0x1b5)](_0x59f10c[_0x2d586a(0x16f)])',
    String.raw`_0x599538=_0x3c7e30.search(/(?:SL-)?OPENTHREAD\//)`,
);
bootloader = replace(bootloader,
    String.raw`/SL-OPENTHREAD\/(\d+)\.(\d+)\.(\d+)\.(\d+)/`,
    String.raw`/(?:SL-)?OPENTHREAD\/(\d+)\.(\d+)\.(\d+)(?:\.(\d+))?/`,
);
bootloader = replace(bootloader,
    "this['parseOpenThreadVersion'](this[_0x193e15(0x18e)])",
    "this.validateOpenThreadResponse(this.tempOpenThreadBuffers)?this.parseOpenThreadVersion(this.tempOpenThreadBuffers):this.tempOpenThreadBuffers.at(-1)===0x7e&&(this.tempOpenThreadBuffers=Buffer.from([0x7e]))",
);

fs.writeFileSync(statePath, state);
fs.writeFileSync(hardwarePath, hardware);
fs.writeFileSync(bootloaderPath, bootloader);
console.log('Added active USB firmware probes and read-only OTBR ownership checks before serial access');
