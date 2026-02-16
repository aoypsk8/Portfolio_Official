/** แสดง alert เฉพาะ mobile เมื่อเข้า home page เพื่อแนะนำให้ใช้คอมพิวเตอร์หรือ iPad */

export function useMobileAlert() {
  const isMobile = ref(false)
  const showPopup = ref(false)

  function checkMobile() {
    if (import.meta.server) return false
    // ตรวจสอบว่าเป็น mobile device (width < 768px)
    const width = window.innerWidth
    return width < 768
  }

  function showAlert() {
    if (import.meta.server) return
    
    // แสดง popup เฉพาะ mobile ทุกครั้งที่เข้า home page
    if (checkMobile()) {
      console.log('[useMobileAlert] Mobile detected, will show popup in 1.5s')
      // ใช้ setTimeout เพื่อให้หน้าเว็บโหลดเสร็จก่อน
      setTimeout(() => {
        console.log('[useMobileAlert] Setting showPopup to true')
        showPopup.value = true
        console.log('[useMobileAlert] showPopup is now:', showPopup.value)
      }, 1500) // รอ 1.5 วินาทีหลังโหลดหน้าเพื่อให้ผู้ใช้เห็นหน้าเว็บก่อน
    } else {
      console.log('[useMobileAlert] Not mobile device, popup will not show')
    }
  }

  function closePopup() {
    console.log('[useMobileAlert] closePopup called, showPopup was:', showPopup.value)
    showPopup.value = false
    console.log('[useMobileAlert] closePopup completed, showPopup is now:', showPopup.value)
  }

  onMounted(() => {
    if (import.meta.server) return
    isMobile.value = checkMobile()
    showAlert()
  })

  return {
    isMobile: readonly(isMobile),
    showPopup,
    showAlert,
    closePopup
  }
}
