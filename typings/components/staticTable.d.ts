import { Vue } from "vue-property-decorator";
interface Item {
    key: string;
    name: string;
    value: string;
}
export default class StaticTable extends Vue {
    readonly tableData: Item[][];
    readonly tableBorderColor: string;
    readonly cellHeight: number;
    readonly headerStyle: CSSStyleDeclaration;
    readonly cellStyle: CSSStyleDeclaration;
    renderPanelBody(): JSX.Element;
    renderTableColumn(colOptions: Item[]): JSX.Element;
    render(): JSX.Element;
}
export {};
