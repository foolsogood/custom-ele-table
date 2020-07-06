import { Vue } from "vue-property-decorator";
import "../style/toast.css";
export default class Toast extends Vue {
    showWrap: boolean;
    showContent: boolean;
    text: string;
    created(): void;
    render(): JSX.Element;
}
