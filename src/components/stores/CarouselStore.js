import {defineStore} from "pinia";
import CarouselData from "@/components/stores/CarouselData.js";
export const useCarouselStore = defineStore({
    id: "carousel",
    state:() => ({
       carousel : 0,
        CarouselData,
        counter: 0,

    }),
    actions: {
        increment() {
            this.counter++;
        },
        decrement() {
            this.counter--;
        },
        setCarousel(index) {
            this.carousel = index;
        },
    },
});