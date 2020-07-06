import { Vue } from "vue-property-decorator";
import "../style/textarea.css";
export default class TextArea extends Vue {
    readonly propContent: string;
    readonly isReadonly: boolean;
    readonly addStyle: object;
    textAreaContent: string;
    mounted(): void;
    textAreaContentChange(val: string): void;
    render(): JSX.Element;
}
