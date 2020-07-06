import { Vue } from "vue-property-decorator";
import "../style/input.css";
export default class Input extends Vue {
    readonly value: string | number;
    readonly addStyle: CSSStyleDeclaration;
    readonly isReadonly: boolean;
    readonly parentColumnId: string | number;
    readonly editPropName: string;
    readonly componentName: string;
    newValue: string;
    onValueChange(val: string): void;
    onNewValueChange(val: string): void;
    render(): JSX.Element;
}
