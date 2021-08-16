import eventBus from '@/eventBus';

export default function goToPage(pageName, pageProps) {
  eventBus.$emit('goToPage', pageName, pageProps);
}
