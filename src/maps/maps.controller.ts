import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, NotFoundException } from '@nestjs/common';
import { MapsService } from './maps.service';

import axios from 'axios';
import { ACCESS_KEY_TOKEN_IPSTACK, GOOGLE_MAPS_API_KEY } from 'src/config/constants';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { from } from 'rxjs';
import * as os from 'os';
import * as ip from 'ip';
@ApiTags("MAPS API")
@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) { }

  // @Post()
  // create(@Body() createMapDto: CreateMapDto) {
  //   return this.mapsService.create(createMapDto);
  // }

  @Get('getCurrentLocation')
  async getCurrentLocation(@Query('public_ip') public_ip: string) {
    // const ip =await this.getPublicIp();
    // console.log(ip)
    // if (!ip) {
    //   throw new NotFoundException("Invalid public IP address! Trying to connect to wifi.");
    // }
    const url = `http://api.ipstack.com/${public_ip}?access_key=${ACCESS_KEY_TOKEN_IPSTACK}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('get/public-ip')
  async getPublicIp(): Promise<string> {
    const response = await fetch('https://api.ipify.org/?format=json');
    const data = await response.json();
    return data.ip;
  }
  // @Get()
  // getIp(): object {
  //   const networkInterfaces = os.networkInterfaces();
  //   const ipList = [];

  //   Object.keys(networkInterfaces).forEach(interfaceName => {
  //     networkInterfaces[interfaceName].forEach(networkInterface => {
  //       // Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
  //       if (networkInterface.family !== 'IPv4' || networkInterface.internal !== false) {
  //         return;
  //       }
  //       ipList.push({
  //         name: interfaceName,
  //         address: networkInterface.address,
  //       });
  //     });
  //   });

  //   const publicIp = ip.address();
  //   return {
  //     privateIpList: ipList,
  //     publicIp: publicIp,
  //   };
  // }
  @Get('getByAddress')
  async findByAddress(@Query('address') address: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${decodeURIComponent(
      address,
    )}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await axios.get(url);
      return response.data.results
    } catch (error) {
      console.error(error);
      return null;
    }

  }
  @Get('getByLatAndLong')
  async getByLatAndLong(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
  ) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  @Get('place_id')
  async getPlaceDetails(@Query('place_id') place_id: string) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  @Get('nearby')
  async findNearby(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius = 1000,
  ) {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mapsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMapDto: UpdateMapDto) {
  //   return this.mapsService.update(+id, updateMapDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mapsService.remove(+id);
  // }
}
