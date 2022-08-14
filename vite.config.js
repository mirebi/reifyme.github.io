import {resolve}  from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
	build: {
		rollupOptions: {
		input: {
			main: resolve(__dirname,'index.html'),
			about: resolve(__dirname,'pages/about.html'),
			blog: resolve(__dirname,'pages/blog.html'),
			contact: resolve(__dirname,'pages/contact_us.html'),
			gallery: resolve(__dirname,'pages/gallery.html')
			}
		}

	}
})
