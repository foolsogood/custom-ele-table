import { Vue } from "vue-property-decorator";
interface ICellData {
    code: string;
    key: string;
}
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
export default class rowEditableTable extends Vue {
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
    onlyOneCellBodyArr: IHeaderArrItem[];
    headerArr: IHeaderArrItem[];
    bodyNotShowPropData: string[];
    curTableData: ITableData[];
    curEditTdId: string;
    textAreaContent: string;
    isBodyEmpty: boolean;
    oneCellData: ICellData;
    get headerClasses(): number[];
    created(): void;
    onTableHeaderChange(val: any[]): void;
    onTextContentChange(val: string): void;
    getValueFromColumn(code: string, key: string): any;
    checkIfNum(n: string): number;
    initData(): void;
    giveIdx2Item(arr: IHeaderItem[], parentSortId?: string, classifyId?: number): IHeaderArrItem[];
    getHeaderItemArr(arr1: IHeaderArrItem[]): void;
    getHeaderItemByKey(key: string): IHeaderArrItem | undefined;
    oneCellHeader(): JSX.Element;
    renderOneCellItem(): JSX.Element | null;
    renderPanelBody(): JSX.Element;
    getRowspan(cell: IHeaderArrItem): number;
    renderHeader(item: IHeaderArrItem, _idx: number): JSX.Element;
    getOneCellItemByKey(key: string, arr?: any): IHeaderArrItem | undefined;
    tdClickHandler(tableId: string): void;
    isAfrontB(A: string, B: string): 1 | -1 | 0;
    getHeaderItemSortIndex(target_key: string): string;
    renderTableColumn(colOptions: ITableData): JSX.Element;
    render(): JSX.Element;
}
export {};
