import React, { Component, useEffect, useRef, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, Connect } from "aws-amplify-react";
import 'rc-slider/assets/index.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, List, Typography, Slider, Card as MaterialCard, CardHeader, CardContent, GridList, GridListTile, ListItem } from "@material-ui/core";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

import "./App.css";

import awsConfig from "./aws-exports";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import { ConsoleLogger } from "@aws-amplify/core";

const d3 = require('d3');

Amplify.configure(awsConfig);

const SunburstChart = props => {
  
  const ref = useRef(null);
  
  useEffect(()=>{
    if(!props.data) return      
    sunburst(props.data);
  })

  const sunburst = (data) =>{    
    const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
    const format = d3.format(",d")
    const width = 975
    const radius = width / 2
    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius / 2)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1 - 1)
      
    const partition = data1 => d3.partition()
        .size([2 * Math.PI, radius])
      (d3.hierarchy(data1)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value))

    const root = partition(data);
  
    const svg = d3.select(ref.current);
    
    svg.append("g")
        .attr("fill-opacity", 0.6)
      .selectAll("path")
      .data(root.descendants().filter(d => d.depth))
      .enter().append("path")
        .attr("fill", d => { 
          if(d.data.intensity === 0) {
            return d3.rgb(220, 220, 220);
          }
          while (d.depth > 1) 
            d = d.parent; 
            
          return color(d.data.name);
        })        
        .attr("d", arc) 
        .on('click', props.clicked)       
      .append("title")
        .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
  
    svg.append("g")
        .attr("pointer-events", "none")        
        .attr("text-anchor", "middle")        
      .selectAll("text")
      .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
      .enter().append("text")
        .attr("transform", function(d) {
          const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
          const y = (d.y0 + d.y1) / 2;
          return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        })
        .attr("dy", "0.35em")
        .text(d => d.data.name);
    
    //svg.attr("viewBox", autoBox);
  }

  const autoBox = () => {
    const {x, y, width, height} = this.getBBox();
    return [x, y, width, height];
  }

  if(props.data){    
    return <svg viewBox="-486.5,-486.4996032714844,973,972.9996337890625" style={{maxWidth: '100%', height: 'auto', font: '1rem sans-serif', margin: '5px', cursor: 'pointer' }} ref={ ref } />     
  }else { 
    return <div id="#sunburst">Loading...</div> 
  }
}

export default SunburstChart;
