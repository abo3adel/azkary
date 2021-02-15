<template>
    <ion-toolbar>
        <ion-back-button>asdsad</ion-back-button>
    </ion-toolbar>
    <ion-content :fullscreen="true">
        <ion-reorder-group @ionItemReorder="doReorder($event)" disabled="false">
            <!-- Default reorder icon, end aligned items -->
            <ion-item>
                <ion-label>
                    Item 1
                </ion-label>
                <ion-reorder slot="end"></ion-reorder>
            </ion-item>

            <ion-item>
                <ion-label>
                    Item 2
                </ion-label>
                <ion-reorder slot="end"></ion-reorder>
            </ion-item>

            <!-- Default reorder icon, start aligned items -->
            <ion-item>
                <ion-reorder slot="start"></ion-reorder>
                <ion-label>
                    Item 3
                </ion-label>
            </ion-item>

            <ion-item>
                <ion-reorder slot="start"></ion-reorder>
                <ion-label>
                    Item 4
                </ion-label>
            </ion-item>

            <!-- Custom reorder icon end items -->
            <ion-item>
                <ion-label>
                    Item 5
                </ion-label>
                <ion-reorder slot="end">
                    <ion-icon name="pizza"></ion-icon>
                </ion-reorder>
            </ion-item>

            <ion-item>
                <ion-label>
                    Item 6
                </ion-label>
                <ion-reorder slot="end">
                    <ion-icon name="pizza"></ion-icon>
                </ion-reorder>
            </ion-item>

            <!-- Items wrapped in a reorder, entire item can be dragged -->
            <ion-reorder>
                <ion-item>
                    <ion-label>
                        Item 7
                    </ion-label>
                </ion-item>
            </ion-reorder>

            <ion-reorder>
                <ion-item>
                    <ion-label>
                        Item 8
                    </ion-label>
                </ion-item>
            </ion-reorder>
        </ion-reorder-group>
    </ion-content>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import {
        IonToolbar,
        IonBackButton,
        IonContent,
        IonReorderGroup,
        IonReorder,
        IonItem,
        IonLabel,
        IonIcon,
    } from '@ionic/vue';
    // import seeder from '@/seeder';

    @Options({
        components: {
            IonToolbar,
            IonBackButton,
            IonContent,
            IonReorderGroup,
            IonReorder,
            IonItem,
            IonLabel,
            IonIcon,
        },
    })
    export default class Home extends Vue {
        page = 'PAGE';

        doReorder(event: CustomEvent) {
            // The `from` and `to` properties contain the index of the item
            // when the drag started and ended, respectively
            console.log(
                'Dragged from index',
                event.detail.from,
                'to',
                event.detail.to
            );

            // Finish the reorder and position the item in the DOM based on
            // where the gesture ended. This method can also be called directly
            // by the reorder group
            event.detail.complete();
        }
        mounted() {
            // seeder.run().then(r => {
            //     console.clear();
            //     console.log('Done Seeded');
            // });
        }
    }
</script>
