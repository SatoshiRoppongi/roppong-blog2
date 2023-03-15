import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default defineNuxtPlugin((nuxtApp) => {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        nuxtApp.vueApp.component(key, component)
    }

    return {
        provide: {
            iconComponent(key: string | undefined) {
                if (key) {
                    return categoryIconMap[key]
                }
            }
        }
    }
})

interface CategoryIconMap {
    [key: string] : string
}

const categoryIconMap: CategoryIconMap = {
    "technology": 'Monitor',
    "workout": "Stopwatch",
    "uncategorized": "Folder",
    "review": "EditPen",
    "artwork": "Picture",
    "crypto": "Coin",
}