<template>
  <div
    v-if="hasToken"
    ref="mapContainerRef"
    class="globe-map-only h-full w-full min-h-[200px]"
    aria-hidden
  />
  <div
    v-else
    class="h-full w-full min-h-[200px] rounded-full bg-slate-200/40"
    aria-hidden
  />
</template>

<script setup lang="ts">
/** แผนที่ลูกโลก Mapbox — ใช้เป็น background ใน Hero หรือใน section ได้ */

const props = withDefaults(
  defineProps<{
    /** โหมด background = ไม่หมุนอัตโนมัติ */
    background?: boolean
    /** ตำแหน่งที่แสดง: เปลี่ยนตาม scroll ได้ (laos / germany) */
    location?: 'laos' | 'germany'
  }>(),
  { background: false, location: 'laos' }
)

const LOCATIONS = {
  laos: { center: [102.6, 18.2] as [number, number], label: 'Laos' },
  germany: { center: [10.45, 51.16] as [number, number], label: 'Germany' }
}
const GLOBE_ZOOM = 1.6

const config = useRuntimeConfig()
const mapContainerRef = ref<HTMLElement | null>(null)
let map: import('mapbox-gl').Map | null = null
let marker: import('mapbox-gl').Marker | null = null
let rafId = 0
let rotating = false

const hasToken = computed(() => Boolean((config.public?.mapboxAccessToken as string)?.trim()))

/** ความเร็วหมุน: background = ช้าแบบโลกจริง, ปกติ = เร็วขึ้น */
const ROTATE_SPEED = 0.15
const ROTATE_SPEED_BACKGROUND = 0.02

function startRotate() {
  if (!map) return
  rotating = true
  const speed = props.background ? ROTATE_SPEED_BACKGROUND : ROTATE_SPEED
  const tick = () => {
    if (!rotating || !map) return
    const bearing = map.getBearing() + speed
    map.rotateTo(bearing % 360, { duration: 0 })
    rafId = requestAnimationFrame(tick)
  }
  rafId = requestAnimationFrame(tick)
}

onMounted(async () => {
  const token = config.public?.mapboxAccessToken as string | undefined
  if (!token?.trim()) return
  await nextTick()
  if (!mapContainerRef.value) return

  const mapboxgl = (await import('mapbox-gl')).default
  await import('mapbox-gl/dist/mapbox-gl.css')

  const loc = LOCATIONS[props.location]
  map = new mapboxgl.Map({
    container: mapContainerRef.value,
    accessToken: token,
    style: 'mapbox://styles/mapbox/satellite-v9',
    projection: 'globe' as const,
    center: loc.center,
    zoom: GLOBE_ZOOM,
    attributionControl: false,
    interactive: false, // ปิดการโต้ตอบทั้งหมด: ไม่สามารถคลิก, drag, หรือ zoom ได้
    boxZoom: false,
    scrollZoom: false,
    dragPan: false,
    dragRotate: false,
    keyboard: false,
    doubleClickZoom: false,
    touchZoomRotate: false
  })

  map.on('load', () => {
    if (!map) return
    map.setFog({
      color: 'rgba(0, 0, 0, 0)',
      'high-color': 'rgba(0, 0, 0, 0)',
      'horizon-blend': 0,
      'space-color': 'rgba(0, 0, 0, 0)',
      'star-intensity': 0
    })
    try {
      const style = map.getStyle()
      const bgLayer = style.layers?.find((l: { id: string }) => l.id === 'background')
      if (bgLayer && 'paint' in bgLayer && (bgLayer as { paint?: { 'background-color'?: string } }).paint?.['background-color']) {
        map.setPaintProperty('background', 'background-color', 'rgba(0,0,0,0)')
      }
    } catch (_) {}
    try {
      if (map.getLayer('sky')) map.removeLayer('sky')
    } catch (_) {}
    const pinSvg = "data:image/svg+xml," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36"><path fill="#14b8a6" stroke="#fff" stroke-width="2" d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z"/><circle fill="#fff" cx="12" cy="12" r="5"/></svg>'
    )
    const wrapper = document.createElement('div')
    wrapper.setAttribute('aria-hidden', 'true')
    wrapper.style.cssText = 'display:flex;flex-direction:column;align-items:center;'
    const labelEl = document.createElement('div')
    labelEl.textContent = loc.label
    labelEl.style.cssText = 'font-size:12px;font-weight:600;color:#0f766e;background:rgba(255,255,255,0.95);padding:2px 8px;border-radius:6px;margin-bottom:4px;white-space:nowrap;box-shadow:0 1px 3px rgba(0,0,0,0.12);font-family:system-ui,sans-serif;'
    const pinEl = document.createElement('div')
    pinEl.style.cssText = 'width:28px;height:36px;background:url(' + pinSvg + ') no-repeat center;background-size:contain;'
    wrapper.appendChild(labelEl)
    wrapper.appendChild(pinEl)
    marker = new mapboxgl.Marker({ element: wrapper })
      .setLngLat(loc.center)
      .addTo(map)
    markerLabelEl = labelEl
    startRotate()
    if (!props.background && mapContainerRef.value) {
      mapContainerRef.value.addEventListener('mouseenter', () => { rotating = false; if (rafId) cancelAnimationFrame(rafId); rafId = 0 })
      mapContainerRef.value.addEventListener('mouseleave', startRotate)
    }
  })
})

let markerLabelEl: HTMLDivElement | null = null
const FLY_DURATION_MS = 1800
let flyEndTimeoutId: ReturnType<typeof setTimeout> | null = null

function updateMapLocation(location: 'laos' | 'germany') {
  if (!map || !marker) return
  const loc = LOCATIONS[location]
  if (markerLabelEl) markerLabelEl.textContent = loc.label
  marker.setLngLat(loc.center)
  rotating = false
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
  if (flyEndTimeoutId) {
    clearTimeout(flyEndTimeoutId)
    flyEndTimeoutId = null
  }
  map.flyTo({
    center: loc.center,
    zoom: GLOBE_ZOOM,
    duration: FLY_DURATION_MS,
    essential: true,
    easing: (t) => t * (2 - t)
  })
  flyEndTimeoutId = setTimeout(() => {
    flyEndTimeoutId = null
    startRotate()
  }, FLY_DURATION_MS + 100)
}

watch(() => props.location, (newLoc) => {
  if (newLoc && map) updateMapLocation(newLoc)
}, { flush: 'post' })

onUnmounted(() => {
  if (flyEndTimeoutId) clearTimeout(flyEndTimeoutId)
  rotating = false
  if (rafId) cancelAnimationFrame(rafId)
  marker?.remove()
  marker = null
  map?.remove()
  map = null
})
</script>

<style scoped>
/* ให้เห็นเฉพาะลูกโลก พื้นหลังแผนที่โปร่งใส */
.globe-map-only :deep(.mapboxgl-canvas-container),
.globe-map-only :deep(canvas) {
  background: transparent !important;
}
.globe-map-only :deep(.mapboxgl-map) {
  background: transparent !important;
}
</style>
