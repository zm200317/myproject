<template>
  <div id="map" class="map"></div>
</template>

<script>
import 'ol/ol.css'
import Map from 'ol/Map'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
import View from 'ol/View'

export default {
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      /* eslint-disable no-new */
      new Map({
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        target: 'map',
        view: new View({
          center: [0, 0],
          zoom: 2
        })
      })

      console.log('init finished')
    }
  }
}
</script>
<style >
  .map {
    width: 100%;
    height: 9.5rem;
  }
  .ol-control button{
    width: 0.3rem;
    height: 0.3rem;
    line-height: .3em;
    display: none;
  }
  ul{
    font-size: 0.12rem;
  }
  .ol-attribution{
    display: none;
  }
</style>
