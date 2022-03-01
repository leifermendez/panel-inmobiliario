import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Component,
    ElementRef, OnChanges,
    OnInit, SimpleChanges,
    ViewChild
} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {RestService} from "../../../../rest.service";
import {BsModalRef} from "ngx-bootstrap/modal";
import {ModalDocsService} from "./modal-docs.service";
import * as _ from 'lodash'
import {TranslateService} from "@ngx-translate/core";
import * as moment from "moment";

@Component({
    selector: 'app-modal-form',
    templateUrl: './modal-form.component.html',
    styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges {
    @ViewChild('formsDynamic') formsDynamic: ElementRef
    form = new FormGroup({});
    model = {}
    options: FormlyFormOptions = {
        formState: {
            disabled: true,
        },
    };
    fields: FormlyFieldConfig[] = [];
    dataLoad: any
    initData: any;
    loading: boolean;
    loadingBtn: boolean;
    disabled: boolean

    constructor(public rest: RestService, public bsModalRef: BsModalRef,
                private modalDocs: ModalDocsService, private translateService: TranslateService) {
    }

    ngOnInit(): void {

        this.loadData();
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes)
    }

    ngAfterViewChecked(): void {

        // console.log(this.model)
    }

    ngAfterViewInit(): void {
        setTimeout(() => {

            // this.model = this.initData?.values || {};
            // console.log(this.model)
        }, 1000)

    }

    loadData = () => {
        try {
            this.dataLoad = this.initData?.formSingle || {}
            this.translateService.get('DOCUMENTS').subscribe(res => {
                this.fields = _.map(this.dataLoad?.fields, (i) => {
                    return {
                        ...i, ...{
                            fieldGroup: _.map(i?.fieldGroup, (o) => this.parseEvalOptions(o, res))
                        }
                    };
                });
            })
            this.disabled = (this.initData?.role === 'admin');
            setTimeout(() => {
                this.loadLazyData()
            }, 10);

            if (this.disabled) {
                setTimeout(() => {
                    this.disabledAll();
                }, 50);
            }
        } catch (e) {
            this.closeModal();
        }
    }

    loadLazyData = () => {
        const {values} = this.initData
        this.model = {...values};
    }

    parseEvalOptions = (entry, res) => {
        /**
         * IMAGE Documentation: ===> https://i.imgur.com/3jI10wv.png
         */
        const binnacle = _.find(_.reverse(this.initData?.binnacleValues), {key: entry.key});
        const {hideExpression} = entry;
        const comparators = {
            eq: (a, b) => a === b,
            or: (a, b) => a || b,
            lt: (a, b) => a < b,
            gt: (a, b) => a > b,
            gte: (a, b) => a >= b,
            lte: (a, b) => a <= b,
            ne: (a, b) => a !== b,
        };
        if (hideExpression && (typeof hideExpression === 'object')) {
            const {condition, model} = hideExpression;
            entry.hideExpression = (modelIn: any) => {
                const symbolComparator = condition[0];
                const valueComparator = condition[1];
                return !comparators[symbolComparator](modelIn[model], valueComparator);

            };
        }

        entry.hooks = {
            onInit: (field: FormlyFieldConfig) => {

                // console.warn(field.parent.form);
            }
        },

            entry.templateOptions.description = binnacle ?
                `${res.EDIT} ${binnacle?.author?.name} ${moment(binnacle?.updatedAt)
                    .format('LLL')}` : null;
        return entry;
    }

    closeModal = () => {
        this.loading = false;
        this.loadingBtn = false
        setTimeout(() => this.bsModalRef.hide(), 250)
    }


    onSubmit(): void {
        this.loadingBtn = true;
        console.log(this.model)
        this.rest.patch(`/documentation/answer/${this.initData?._id}`, {values: this.model})
            .subscribe(res => {
                this.modalDocs.result.emit(res)
                this.closeModal()
            }, error => {
                this.loadingBtn = false
            })
    }

    disabledAll = () => {
        const inputs = this.formsDynamic.nativeElement.querySelectorAll('formly-field-input input') as any;
        inputs.forEach(a => {
            a.disabled = true
        })
    }
}
