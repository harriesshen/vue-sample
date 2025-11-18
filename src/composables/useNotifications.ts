import { notificationStatus } from '@/constant/calender'
import { onMounted, ref } from 'vue'

// Notification status 'default' | 'granted' | 'denied'
const permission = ref(Notification.permission)

export default function useNotifications() {
  const requestPermission = async () => {
    if (permission.value === notificationStatus.DEFAULT) {
      const result = await Notification.requestPermission()
      permission.value = result
    }
  }

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (permission.value !== notificationStatus.GRANTED) {
      alert('使用者尚未同意桌面通知。')
      return
    }
    const notification = new Notification(title, options)
    // (可選) 點擊通知時要做的事
    notification.onclick = () => {
      // 例如：將瀏覽器視窗帶到最前面
      window.focus()
    }
  }

  onMounted(() => {
    requestPermission()
  })

  return {
    permission, // (Ref) 讓您可以在 UI 上顯示當前權限狀態
    requestPermission,
    sendNotification,
  }
}
