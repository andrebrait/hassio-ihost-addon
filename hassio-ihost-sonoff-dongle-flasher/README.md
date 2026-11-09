# SONOFF Dongle Flasher

![Supports armv7 Architecture](https://img.shields.io/badge/armv7-yes-green.svg) ![Supports aarch64 Architecture](https://img.shields.io/badge/aarch64-yes-green.svg) ![Supports amd64 Architecture](https://img.shields.io/badge/amd64-yes-green.svg)
 
## About

SONOFF Dongle Flasher supports online firmware flashing for the iHost MG21 chip and the SONOFF Dongle series (ZBDongle-P, ZBDongle-E, Dongle-M, Dongle-PMG24, Dongle-LMG21, Dongle-PZG23 and Dongle-MZG23).

In addition to the SONOFF Dongle Flasher app, we also provide a [container version](https://hub.docker.com/r/ewelink/sonoff-dongle-flasher).

This fork builds the published 1.3.4 application on Home Assistant's Alpine 3.24 base for amd64/aarch64 and Alpine 3.22 for armv7, the newest HA base available for that architecture. It installs esptool 5.6.0 and bundles a pinned firmware catalogue for offline use after installation.

For ZBDongle-E, Dongle-PMG24, Dongle-LMG21 and Dongle-M, the catalogue adds Zigbee coordinator/router **8.2.2.0** and OpenThread **2.7.2.0**. It also offers upstream prereleases Zigbee **9.1.2** and OpenThread **3.1.2**, marked **beta**. Existing official firmware remains available.

The first installation builds locally instead of pulling the original prebuilt add-on. It requires internet access to download the application, dependencies and firmware. See [Documentation](DOCS.md) for baud rates, sources and upgrade precautions. The upstream Docker Hub image linked above does not contain these fork changes.

## Prerequisites

Before using the app, please make sure the serial port is not in use (it is commonly occupied by services like Zigbee2MQTT or ZHA).
During the firmware flashing process, the app will attempt to connect to the device and automatically check whether the serial port is occupied.
If it is, the app will try to stop the conflicting service for you.
[Operation Guide >](https://github.com/iHost-Open-Source-Project/ha-operating-system?tab=readme-ov-file#readme)


## Installation
1. Go to the App Store → Click the **More** button (⋮) in the upper-right corner → Select **Repositories**  
2. Paste the following URL:  
   [https://github.com/andrebrait/hassio-ihost-addon](https://github.com/andrebrait/hassio-ihost-addon)
3. Or, simply click the button below to add it automatically:

[![Add Repository](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fandrebrait%2Fhassio-ihost-addon)

## How to use

See “Documentation” for details on how to use the SONOFF Dongle Flasher app.