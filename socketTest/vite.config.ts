import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/chatRoomTest/', // ⬅️ 跟你的 GitHub repo 名稱一致！
build: {
  outDir: 'dist', // ✅ 改成預設值！
}

})
