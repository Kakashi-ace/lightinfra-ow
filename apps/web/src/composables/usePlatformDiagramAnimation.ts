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

function showStaticDiagram(scope: HTMLElement): void {
  gsap.set(scope.querySelectorAll('[data-animation], [data-animation] *'), {
    clearProps: STATIC_CLEAR_PROPS
  })
}

function preparePaths(paths: SVGPathElement[]): void {
  paths.forEach((path) => {
    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
  })
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

        try {
          animationContext = gsap.context(() => {
            const header = scope.querySelector<HTMLElement>('[data-animation="header"]')
            const stage = scope.querySelector<HTMLElement>('.platform-stage')
            const steps = gsap.utils.toArray<HTMLElement>('[data-animation="step"]', scope)
            const connectors = gsap.utils.toArray<SVGPathElement>('[data-animation="connector"]', scope)
            const connectorArrows = gsap.utils.toArray<SVGPathElement>('[data-animation="connector-arrow"]', scope)
            const aiPaths = gsap.utils.toArray<SVGPathElement>('[data-animation="ai-trace"] path', scope)
            const opticalPaths = gsap.utils.toArray<SVGPathElement>(
              '[data-animation="optical-rays"] path, [data-animation="optical-plot"] path',
              scope
            )
            const productionPaths = gsap.utils.toArray<SVGPathElement>(
              '[data-animation="production-scan"] path:not([stroke-dasharray])',
              scope
            )
            const productionGuides = gsap.utils.toArray<SVGPathElement>(
              '[data-animation="production-scan"] path[stroke-dasharray]',
              scope
            )

            if (!header || !stage || steps.length !== 3 || connectors.length !== 2 || connectorArrows.length !== 2) {
              throw new Error('Platform diagram animation anchors are incomplete')
            }

            preparePaths([...aiPaths, ...opticalPaths, ...productionPaths, ...connectors])
            gsap.set(header, { autoAlpha: 0, y: 36 })
            gsap.set(steps, { autoAlpha: 0, y: 48, scale: 0.94, transformOrigin: '50% 50%' })
            gsap.set(connectorArrows, { autoAlpha: 0 })
            gsap.set(productionGuides, { autoAlpha: 0 })

            const timeline = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: scope,
                start: 'top top+=80',
                end: '+=2200',
                scrub: 0.65,
                pin: stage,
                anticipatePin: 1,
                invalidateOnRefresh: true
              }
            })

            timeline
              .to(header, { autoAlpha: 1, y: 0, duration: 0.7 })
              .to(steps[0]!, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 })
              .to(aiPaths, { strokeDashoffset: 0, duration: 0.8, stagger: 0.06 }, '<')
              .to(connectors[0]!, { strokeDashoffset: 0, duration: 0.45 })
              .to(connectorArrows[0]!, { autoAlpha: 1, duration: 0.12 }, '<75%')
              .to(steps[1]!, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 })
              .to(opticalPaths, { strokeDashoffset: 0, duration: 0.8, stagger: 0.05 }, '<')
              .to(connectors[1]!, { strokeDashoffset: 0, duration: 0.45 })
              .to(connectorArrows[1]!, { autoAlpha: 1, duration: 0.12 }, '<75%')
              .to(steps[2]!, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 })
              .to(productionPaths, { strokeDashoffset: 0, duration: 0.8, stagger: 0.05 }, '<')
              .to(productionGuides, { autoAlpha: 1, duration: 0.45 }, '<35%')
              .to('[data-animation="ai-nodes"], [data-animation="optical-focus"], [data-animation="production-products"]', {
                scale: 1.05,
                transformOrigin: '50% 50%',
                duration: 0.25,
                yoyo: true,
                repeat: 1
              })
          }, scope)
        } catch (error) {
          animationContext?.revert()
          showStaticDiagram(scope)
          console.warn('Platform diagram animation was disabled.', error)
          return
        }

        return () => animationContext?.revert()
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
