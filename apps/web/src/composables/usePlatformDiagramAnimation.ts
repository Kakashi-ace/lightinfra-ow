import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATIC_CLEAR_PROPS = [
  'opacity',
  'visibility',
  'transform',
  'transformOrigin',
  'strokeDasharray',
  'strokeDashoffset'
].join(',')

const STAGE_THRESHOLDS = [0.30, 0.40, 0.40, 0.50, 0.50] as const
const GEOMETRY_SELECTOR = 'path, rect, circle, line, polyline, polygon, ellipse'

interface Drawable {
  element: SVGGeometryElement
  length: number
}

interface Stage {
  intro: gsap.core.Timeline
  ambient: gsap.core.Timeline
  drawables: Drawable[]
}

function showStaticDiagram(scope: HTMLElement): void {
  gsap.set(scope.querySelectorAll('[data-animation], [data-animation] *'), {
    clearProps: STATIC_CLEAR_PROPS
  })
  gsap.set(scope.querySelectorAll('[data-animation*="-motion-"]'), { autoAlpha: 0 })
  gsap.set(scope.querySelectorAll('[data-animation="connector-line"]'), {
    autoAlpha: 1,
    strokeDasharray: 'none',
    strokeDashoffset: 0
  })
  gsap.set(scope.querySelectorAll('[data-animation^="connector-"]'), { autoAlpha: 1 })
}

function collectDrawables(scope: HTMLElement, anchorSelector: string): Drawable[] {
  const anchors = gsap.utils.toArray<SVGElement>(anchorSelector, scope)
  const geometries = new Set<SVGGeometryElement>()

  anchors.forEach((anchor) => {
    if (anchor instanceof SVGGeometryElement) geometries.add(anchor)
    anchor.querySelectorAll<SVGGeometryElement>(GEOMETRY_SELECTOR).forEach((geometry) => geometries.add(geometry))
  })

  return [...geometries].flatMap((element) => {
    const stroke = getComputedStyle(element).stroke
    if (!stroke || stroke === 'none') return []

    try {
      const length = element.getTotalLength()
      return Number.isFinite(length) && length > 0 ? [{ element, length }] : []
    } catch {
      return []
    }
  })
}

function seedDrawables(drawables: Drawable[]): void {
  drawables.forEach(({ element, length }) => {
    gsap.set(element, { strokeDasharray: length, strokeDashoffset: length })
  })
}

function finishDrawables(drawables: Drawable[]): void {
  gsap.set(drawables.map(({ element }) => element), {
    clearProps: 'strokeDasharray,strokeDashoffset'
  })
}

function createAiLoop(scope: HTMLElement): gsap.core.Timeline {
  const flow = gsap.utils.toArray<SVGGeometryElement>('[data-animation="ai-motion-flow"] path', scope)
  const nodes = gsap.utils.toArray<SVGGraphicsElement>('[data-animation="ai-nodes"] circle', scope)
  const status = gsap.utils.toArray<SVGGraphicsElement>('[data-animation="ai-status"] circle', scope)

  gsap.set(flow, { strokeDashoffset: 0 })
  return gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.35 })
    .to(flow, { autoAlpha: 0.95, duration: 0.12 }, 0)
    .to(flow, { strokeDashoffset: -48, duration: 1.25, ease: 'none' }, 0)
    .to(nodes, {
      scale: 1.14,
      transformOrigin: '50% 50%',
      duration: 0.22,
      stagger: { each: 0.07, yoyo: true, repeat: 1 },
      ease: 'sine.inOut'
    }, 0.25)
    .to(status, {
      autoAlpha: 0.35,
      duration: 0.18,
      stagger: { each: 0.22, yoyo: true, repeat: 1 }
    }, 1.05)
    .set(flow, { autoAlpha: 0 }, 2.15)
}

function createOpticalLoop(scope: HTMLElement): gsap.core.Timeline {
  const rays = gsap.utils.toArray<SVGGeometryElement>('[data-animation="optical-motion-rays"] path', scope)
  const focus = scope.querySelector<SVGGraphicsElement>('[data-animation="optical-focus"]')
  const plot = scope.querySelector<SVGPathElement>('[data-animation="optical-motion-plot"]')
  const peak = scope.querySelector<SVGGraphicsElement>('[data-animation="optical-peak"]')

  gsap.set(rays, { strokeDashoffset: 0 })
  if (plot) {
    const length = plot.getTotalLength()
    gsap.set(plot, { strokeDasharray: length, strokeDashoffset: length })
  }

  return gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.35 })
    .to(rays, { autoAlpha: 0.9, duration: 0.12 }, 0)
    .to(rays, { strokeDashoffset: -46, duration: 0.95, stagger: 0.04, ease: 'none' }, 0)
    .to(focus, { scale: 1.35, transformOrigin: '50% 50%', duration: 0.22, yoyo: true, repeat: 1 }, 0.68)
    .to(plot, { autoAlpha: 0.9, strokeDashoffset: 0, duration: 0.85, ease: 'power1.inOut' }, 1.05)
    .to(peak, { scale: 1.45, transformOrigin: '50% 50%', duration: 0.2, yoyo: true, repeat: 1 }, 1.65)
    .set([rays, plot], { autoAlpha: 0 }, 2.2)
}

function createProductionLoop(scope: HTMLElement): gsap.core.Timeline {
  const scan = gsap.utils.toArray<SVGGeometryElement>('[data-animation="production-motion-scan"] path', scope)
  const product = scope.querySelector<SVGGraphicsElement>('[data-animation="production-product"]')
  const check = scope.querySelector<SVGGraphicsElement>('[data-animation="production-check-material"]')
  const feedback = gsap.utils.toArray<SVGGraphicsElement>('[data-animation="production-feedback"] circle', scope)

  return gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.35 })
    .to(scan, { autoAlpha: 0.95, duration: 0.12 }, 0)
    .to(scan, { scaleX: 0.72, transformOrigin: '50% 0%', duration: 0.42, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0)
    .to(product, { scale: 1.07, transformOrigin: '50% 50%', duration: 0.2, yoyo: true, repeat: 1 }, 0.72)
    .to(check, { strokeWidth: 5, duration: 0.18, yoyo: true, repeat: 1 }, 0.78)
    .to(feedback, {
      scale: 1.35,
      transformOrigin: '50% 50%',
      duration: 0.18,
      stagger: { each: 0.2, yoyo: true, repeat: 1 }
    }, 1.12)
    .set(scan, { autoAlpha: 0 }, 2.05)
}

function createConnectorPass(
  line: SVGPathElement,
  start: SVGCircleElement,
  end: SVGCircleElement,
  duration: number
): gsap.core.Timeline {
  const length = line.getTotalLength()

  return gsap.timeline({ paused: true })
    .set([start, end], { autoAlpha: 1 })
    .set(line, { strokeDasharray: length, strokeDashoffset: length })
    .to(line, { strokeDashoffset: 0, duration, ease: 'none' }, 0)
}

function createConnectorLoop(start: SVGCircleElement, end: SVGCircleElement): gsap.core.Timeline {
  return gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.24 })
    .to([start, end], { autoAlpha: 0.55, duration: 0.2, yoyo: true, repeat: 1 }, 0)
}

function createGraphicIntro(
  step: HTMLElement,
  drawables: Drawable[],
  material: SVGGraphicsElement[],
  totalDuration: number,
  guides: SVGGeometryElement[] = []
): gsap.core.Timeline {
  const drawElements = drawables.map(({ element }) => element)
  const drawDuration = totalDuration * 0.64
  const materialStart = totalDuration * 0.34

  const timeline = gsap.timeline({ paused: true })
    .to(step, { autoAlpha: 1, y: 0, scale: 1, duration: 0.34, ease: 'power2.out' }, 0)
    .to(drawElements, {
      strokeDashoffset: 0,
      duration: drawDuration,
      stagger: { amount: totalDuration * 0.24 },
      ease: 'power1.inOut'
    }, 0.08)
    .to(material, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.34,
      stagger: { amount: totalDuration * 0.22 },
      ease: 'power2.out'
    }, materialStart)

  if (guides.length) {
    timeline.to(guides, { autoAlpha: 1, duration: 0.28, ease: 'power1.out' }, materialStart)
  }

  return timeline
}

export function usePlatformDiagramAnimation(root: Ref<HTMLElement | null>): void {
  let media: gsap.MatchMedia | undefined
  let refreshFrame: number | undefined

  onMounted(() => {
    const scope = root.value
    if (!scope) return

    media = gsap.matchMedia()
    media.add(
      {
        animated: '(min-width: 1201px) and (prefers-reduced-motion: no-preference)',
        static: '(max-width: 1200px), (prefers-reduced-motion: reduce)'
      },
      (context) => {
        if (!context.conditions?.animated) {
          showStaticDiagram(scope)
          return
        }

        let animationContext: gsap.Context | undefined
        let visibilityHandler: (() => void) | undefined
        let headerIntro: gsap.core.Timeline | undefined
        let stages: Stage[] = []
        let queuedStages = new Set<number>()
        let completedStages = new Set<number>()
        let activeAmbient = new Set<number>()
        let runActive = false
        let generation = 0

        try {
          animationContext = gsap.context(() => {
            const header = scope.querySelector<HTMLElement>('[data-animation="header"]')
            const steps = gsap.utils.toArray<HTMLElement>('[data-animation="step"]', scope)
            const connectorRoots = gsap.utils.toArray<HTMLElement>('[data-connector]', scope)
            const connectorLines = gsap.utils.toArray<SVGPathElement>('[data-animation="connector-line"]', scope)
            const connectorStarts = gsap.utils.toArray<SVGCircleElement>('[data-animation="connector-start"]', scope)
            const connectorEnds = gsap.utils.toArray<SVGCircleElement>('[data-animation="connector-end"]', scope)
            const aiMaterialGroup = scope.querySelector<SVGGElement>('[data-animation="ai-materialize"]')
            const opticalMaterialGroup = scope.querySelector<SVGGElement>('[data-animation="optical-materialize"]')
            const productionMaterialGroup = scope.querySelector<SVGGElement>('[data-animation="production-materialize"]')

            if (
              !header || steps.length !== 3 || connectorRoots.length !== 2 ||
              connectorLines.length !== 2 || connectorStarts.length !== 2 || connectorEnds.length !== 2 ||
              !aiMaterialGroup || !opticalMaterialGroup || !productionMaterialGroup
            ) {
              throw new Error('Platform diagram animation anchors are incomplete')
            }

            const aiDrawables = collectDrawables(scope, '[data-animation^="ai-draw-"]')
            const opticalDrawables = collectDrawables(scope, '[data-animation^="optical-draw-"]')
            const productionDrawables = collectDrawables(scope, '[data-animation^="production-draw-"]')
            const connectorDrawables = connectorLines.map((element) => ({ element, length: element.getTotalLength() }))
            const allDrawables = [...aiDrawables, ...opticalDrawables, ...productionDrawables, ...connectorDrawables]
            const aiMaterial = Array.from(aiMaterialGroup.children) as SVGGraphicsElement[]
            const opticalMaterial = Array.from(opticalMaterialGroup.children) as SVGGraphicsElement[]
            const productionMaterial = Array.from(productionMaterialGroup.children) as SVGGraphicsElement[]
            const productionGuides = gsap.utils.toArray<SVGGeometryElement>('[data-animation="production-scan-guides"] path', scope)

            headerIntro = gsap.timeline({ paused: true })
              .to(header, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' })

            stages = [
              {
                intro: createGraphicIntro(steps[0]!, aiDrawables, aiMaterial, 1.05),
                ambient: createAiLoop(scope),
                drawables: aiDrawables
              },
              {
                intro: createGraphicIntro(steps[1]!, opticalDrawables, opticalMaterial, 1.1),
                ambient: createOpticalLoop(scope),
                drawables: opticalDrawables
              },
              {
                intro: createConnectorPass(connectorLines[0]!, connectorStarts[0]!, connectorEnds[0]!, 0.95),
                ambient: createConnectorLoop(connectorStarts[0]!, connectorEnds[0]!),
                drawables: [connectorDrawables[0]!]
              },
              {
                intro: createGraphicIntro(steps[2]!, productionDrawables, productionMaterial, 1.2, productionGuides),
                ambient: createProductionLoop(scope),
                drawables: productionDrawables
              },
              {
                intro: createConnectorPass(connectorLines[1]!, connectorStarts[1]!, connectorEnds[1]!, 0.95),
                ambient: createConnectorLoop(connectorStarts[1]!, connectorEnds[1]!),
                drawables: [connectorDrawables[1]!]
              }
            ]

            const seedInitialState = () => {
              gsap.set(header, { autoAlpha: 0, y: 36 })
              gsap.set(steps, { autoAlpha: 0, y: 48, scale: 0.94, transformOrigin: '50% 50%' })
              gsap.set([...aiMaterial, ...opticalMaterial, ...productionMaterial], {
                autoAlpha: 0,
                scale: 0.78,
                transformOrigin: '50% 50%'
              })
              gsap.set(productionGuides, { autoAlpha: 0 })
              gsap.set([...connectorStarts, ...connectorEnds], { autoAlpha: 0 })
              gsap.set(scope.querySelectorAll('[data-animation*="-motion-"]'), { autoAlpha: 0 })
              seedDrawables(allDrawables)
            }

            const stopAmbient = () => {
              stages.forEach(({ ambient }) => ambient.pause(0))
              activeAmbient.clear()
            }

            const resetRun = () => {
              generation += 1
              runActive = false
              headerIntro?.pause(0)
              headerIntro?.eventCallback('onComplete', null)
              stages.forEach(({ intro }) => {
                intro.pause(0)
                intro.eventCallback('onComplete', null)
              })
              stopAmbient()
              queuedStages.clear()
              completedStages.clear()
              seedInitialState()
            }

            const startStage = (stageIndex: number) => {
              if (document.hidden || queuedStages.has(stageIndex) || completedStages.has(stageIndex)) return
              const stage = stages[stageIndex]
              if (!stage) return

              queuedStages.add(stageIndex)
              const currentGeneration = generation
              stage.intro.eventCallback('onComplete', () => {
                if (currentGeneration !== generation) return
                finishDrawables(stage.drawables)
                completedStages.add(stageIndex)
                stage.ambient.restart()
                activeAmbient.add(stageIndex)
              })
              stage.intro.restart()
            }

            const enqueueThrough = (progress: number) => {
              STAGE_THRESHOLDS.forEach((threshold, stageIndex) => {
                if (progress >= threshold) startStage(stageIndex)
              })
            }

            const reverseStage = (stageIndex: number) => {
              if (!queuedStages.has(stageIndex)) return
              const stage = stages[stageIndex]
              if (!stage || stage.intro.progress() === 0) return

              stage.ambient.pause(0)
              activeAmbient.delete(stageIndex)
              seedDrawables(stage.drawables)
              stage.intro.eventCallback('onComplete', null)
              stage.intro.eventCallback('onReverseComplete', () => {
                queuedStages.delete(stageIndex)
                completedStages.delete(stageIndex)
                stage.intro.eventCallback('onReverseComplete', null)
              })
              stage.intro.reverse()
            }

            const updateStagesForProgress = (progress: number, direction: number) => {
              STAGE_THRESHOLDS.forEach((threshold, stageIndex) => {
                if (direction < 0 && progress < threshold) reverseStage(stageIndex)
                if (direction > 0 && progress >= threshold) startStage(stageIndex)
              })
            }

            const beginRun = (progress: number) => {
              if (!runActive) {
                runActive = true
                generation += 1
                const currentGeneration = generation
                headerIntro?.eventCallback('onComplete', () => {
                  if (currentGeneration !== generation) return
                })
                headerIntro?.restart()
              }
              enqueueThrough(progress)
            }

            seedInitialState()

            visibilityHandler = () => {
              if (document.hidden) {
                headerIntro?.pause()
                activeAmbient.forEach((stageIndex) => stages[stageIndex]?.ambient.pause())
                return
              }

              headerIntro?.resume()
              activeAmbient.forEach((stageIndex) => stages[stageIndex]?.ambient.resume())
            }
            document.addEventListener('visibilitychange', visibilityHandler)

            const trigger = ScrollTrigger.create({
              trigger: scope,
              start: 'top bottom',
              end: 'bottom top',
              invalidateOnRefresh: true,
              onEnter: (self) => beginRun(self.progress),
              onEnterBack: (self) => {
                beginRun(self.progress)
                updateStagesForProgress(self.progress, -1)
              },
              onUpdate: (self) => {
                if (!runActive) beginRun(self.progress)
                updateStagesForProgress(self.progress, self.direction)
              },
              onLeave: resetRun,
              onLeaveBack: resetRun
            })

            if (trigger.isActive) beginRun(trigger.progress)
          }, scope)
        } catch (error) {
          if (visibilityHandler) document.removeEventListener('visibilitychange', visibilityHandler)
          animationContext?.revert()
          showStaticDiagram(scope)
          console.warn('Platform diagram animation was disabled.', error)
          return
        }

        return () => {
          if (visibilityHandler) document.removeEventListener('visibilitychange', visibilityHandler)
          generation += 1
          stages.forEach(({ intro, ambient }) => {
            intro.kill()
            ambient.kill()
          })
          headerIntro?.kill()
          animationContext?.revert()
        }
      }
    )

    refreshFrame = requestAnimationFrame(() => {
      refreshFrame = undefined
      ScrollTrigger.refresh()
    })
  })

  onBeforeUnmount(() => {
    if (refreshFrame !== undefined) cancelAnimationFrame(refreshFrame)
    media?.revert()
    media = undefined
  })
}
