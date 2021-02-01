import { Vue } from "vue-property-decorator";
interface ITableData {
    [prop: string]: any;
}
interface IOssTableData extends ITableData {
    key?: string;
}
interface IHeaderItem {
    colSpan?: number;
    isCanEdit?: boolean;
    onlyOneCell?: boolean;
    rowSpan?: number;
    key?: string;
    title: string;
    children?: IHeaderItem[];
}
interface IHeaderArrItem extends IHeaderItem {
    classifyId: number;
    sortIdx: string;
}
interface IData {
    value: string;
    prop: string;
    parentColumnId: string | number;
}
export default class mutilTable extends Vue {
    readonly tableData: ITableData[];
    readonly tableHeader: IHeaderItem[];
    readonly bodyNotShowProps: string[];
    readonly tableBorderColor: string;
    readonly cellHeight: number;
    readonly uniqueKey: string;
    readonly firstThClickHandler: () => void;
    readonly isFirstThEableClick: boolean;
    readonly firstThStyle: object;
    readonly isReadOnly: boolean;
    readonly bodyEmptyTips: string;
    readonly headerStyle: CSSStyleDeclaration;
    readonly cellStyle: CSSStyleDeclaration;
    readonly calcCellStyle: CSSStyleDeclaration;
    ossTableHeader: IHeaderArrItem[];
    ossTableData: IOssTableData[];
    headerArr: IHeaderArrItem[];
    bodyNotShowPropData: string[];
    curTableData: ITableData[];
    curEditTdId: string;
    isBodyEmpty: boolean;
    get headerClasses(): number[];
    created(): void;
    onTableHeaderChange(val: any[]): void;
    reCalculate(): void;
    numberChangeHandler(val: IData): void;
    getValueFromColumn(code: string, key: string): any;
    checkIfNum(n: string): number;
    initData(): void;
    combineCellByKey(key: string): void;
    classifyHeaderHandler(): JSX.Element;
    tdClickHandler(tableId: string, isCanEdit: boolean): void;
    renderPanelBody(): JSX.Element;
    getHeaderItemSortIndex(target_key: string): string;
    getHeaderItemArr(arr1: IHeaderArrItem[]): void;
    getRowspan(cell: IHeaderArrItem): number;
    getIfHeaderItemCanEditByKey(key: string): boolean;
    isAfrontB(A: string, B: string): 1 | -1 | 0;
    renderTableColumn(colOptions: ITableData): JSX.Element;
    giveIdx2Item(arr: IHeaderItem[], parentSortId?: string, classifyId?: number): IHeaderArrItem[];
    render(): JSX.Element;
}
export {};
