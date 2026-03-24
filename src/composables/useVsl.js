import { onMounted, onUnmounted } from 'vue'

export function useVsl() {
  let observer = null

  onMounted(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth <= 768

    if (isMobile) return

    const target = document.querySelector('#vslintersection')
    if (!target) return

    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const vslcontainer = document.getElementById('vslcontainer')
        if (!vslcontainer) continue

        if (!entry.isIntersecting) {
          vslcontainer.style.position = 'fixed'
          vslcontainer.style.bottom = '3rem'
          vslcontainer.style.right = '3rem'
          vslcontainer.style.maxWidth = '20rem'
          vslcontainer.style.zIndex = '10000'
          vslcontainer.style.display = 'none'
          vslcontainer.classList.add('lg:!block')
        } else {
          vslcontainer.style.position = 'initial'
          vslcontainer.style.bottom = '0'
          vslcontainer.style.right = '0'
          vslcontainer.style.maxWidth = '60rem'
          vslcontainer.style.zIndex = '10000'
          vslcontainer.style.display = ''
          vslcontainer.classList.remove('lg:!block')
        }
      }
    })

    observer.observe(target)
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
}
