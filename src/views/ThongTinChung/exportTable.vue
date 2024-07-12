<script setup lang="ts">
import Vue3Datatable from '@bhplugin/vue3-datatable';
import IconPrinter from '@/components/icon/icon-printer.vue';
import IconFile from '@/components/icon/icon-file.vue';
import { capitalize, ref } from 'vue';
// import router from '@/router';
import { store } from '@/stores';
import { useRouter } from 'vue-router';

const props = defineProps({
    cols: {
        type: Array,
        required: true
    },
    rows: {
        type: Array,
        required: true
    },
    page: {
        type: String,
        required: true
    }
});

const fields = {}
props.cols?.forEach(e => {
    fields[e['title']] = e['field']
})

const loading: any = ref(false);

const columnFilterLang = ref<Record<string, string>>({
    no_filter: 'Không',
    contain: 'Chứa',
    not_contain: 'Không chứa',
    equal: 'Bằng',
    not_equal: 'Không bằng',
    start_with: 'Bắt đầu với',
    end_with: 'Kết thúc với',
    greater_than: 'Lớn hơn',
    greater_than_equal: 'Lớn hơn hoặc bằng',
    less_than: 'Nhỏ hơn',
    less_than_equal: 'Nhỏ hơn hoặc bằng',
    is_null: 'Không được thiết lập',
    is_not_null: 'Được thiết lập',
    true: 'Hoàn thành',
    false: 'Chưa hoàn thành'
});

const datatable: any = ref(null);

const exportTable = (type) => {
    let columns: any = props.cols.map((d) => {
        return d.field;
    });

    let records
    if (datatable.value.getSelectedRows()) {
        records = datatable.value.getSelectedRows()
    } else {
        records = props.rows;
    }
    let filename = 'table';

    let newVariable: any;
    newVariable = window.navigator;

    if (type == 'csv') {
        let coldelimiter = ',';
        let linedelimiter = '\n';
        let result = columns
            .map((d) => {
                return capitalize(d);
            })
            .join(coldelimiter);
        result += linedelimiter;
        records.map((item) => {
            columns.map((d: any, index) => {
                if (index > 0) {
                    result += coldelimiter;
                }
                let val
                if (typeof item[d] === 'boolean') {
                    val = item[d] ? item[d] : 'false';
                } else {
                    val = item[d] ? item[d] : '';
                }
                result += val;
            });
            result += linedelimiter;
        });

        if (result == null) return;
        if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
            var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(result);
            var link = document.createElement('a');
            link.setAttribute('href', data);
            link.setAttribute('download', filename + '.csv');
            link.click();
        } else {
            var blob = new Blob([result]);
            if (newVariable.msSaveOrOpenBlob) {
                newVariable.msSaveBlob(blob, filename + '.csv');
            }
        }
    } else if (type == 'print') {
        var rowhtml = '<p>' + filename + '</p>';
        rowhtml +=
            '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
        columns.map((d) => {
            rowhtml += '<th>' + capitalize(d) + '</th>';
        });
        rowhtml += '</tr></thead>';
        rowhtml += '<tbody>';

        records.map((item) => {
            rowhtml += '<tr>';
            columns.map((d: any) => {
                let val = item[d] ? item[d] : '';
                rowhtml += '<td>' + val + '</td>';
            });
            rowhtml += '</tr>';
        });
        rowhtml +=
            '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
        rowhtml += '</tbody></table>';
        var winPrint: any = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
        winPrint.document.write('<title>Print</title>' + rowhtml);
        winPrint.document.close();
        winPrint.focus();
        winPrint.print();
        // winPrint.close();
    } else if (type == 'txt') {
        let coldelimiter = ';';
        let linedelimiter = '\n';
        let result = columns
            .map((d) => {
                return capitalize(d);
            })
            .join(coldelimiter);
        result += linedelimiter;
        records.map((item) => {
            columns.map((d: any, index) => {
                if (index > 0) {
                    result += coldelimiter;
                }
                let val = item[d] ? item[d] : '';
                result += val;
            });
            result += linedelimiter;
        });

        if (result == null) return;
        if (!result.match(/^data:text\/txt/i) && !newVariable.msSaveOrOpenBlob) {
            var data = 'data:application/txt;charset=utf-8,' + encodeURIComponent(result);
            var link = document.createElement('a');
            link.setAttribute('href', data);
            link.setAttribute('download', filename + '.txt');
            link.click();
        } else {
            var blob = new Blob([result]);
            if (newVariable.msSaveOrOpenBlob) {
                newVariable.msSaveBlob(blob, filename + '.txt');
            }
        }
    }
};

const splitString = (target) => {
    return target.split(',').map(num => num.trim());
}

const getExcelData = () => {
    return (datatable.value && datatable.value.getSelectedRows().length !== 0) ? datatable.value.getSelectedRows() : props.rows;
}
console.log()
const rowClick = (data: any) => {
    router.push({ name: 'GeneralEdit', params: { entity: props.page, data: data } });
};
const router = useRouter();
const navigateWithData = (data) => {
    store.dispatch('updateData', data);
    router.push({ name: 'GeneralEdit', params: { entity: props.page } });
};
</script>

<template>
    <div class="panel pb-1.5 mt-0">
        <div class="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
            <div class="flex items-center flex-wrap">
                <button type="button" class="btn bg-[#f58236] hover:bg-[#e3600c] text-white btn-sm m-1 shadow-none" @click="exportTable('csv')">
                    <icon-file class="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                    CSV
                </button>
                <button type="button" class="btn bg-[#f58236] hover:bg-[#e3600c] text-white btn-sm m-1 shadow-none" @click="exportTable('txt')">
                    <icon-file class="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                    TXT
                </button>
                <downloadExcel
                    class="btn bg-[#f58236] hover:bg-[#e3600c] text-white btn-sm m-1 cursor-pointer shadow-none"
                    :data="getExcelData()"
                    :fields="fields"
                    type="xlsx" worksheet="My Worksheet"
                    name="filename.xlsx"
                >
                    <icon-file class="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                    EXCEL
                </downloadExcel>
                <button type="button" class="btn bg-[#f58236] hover:bg-[#e3600c] text-white btn-sm m-1 shadow-none" @click="exportTable('print')">
                    <icon-printer class="ltr:mr-2 rtl:ml-2" />
                    PRINT
                </button>
            </div>
        </div>

        <div class="datatable">
            <vue3-datatable
                ref="datatable"
                :rows="rows"
                :columns="cols"
                :totalRows="rows?.length"
                :loading="loading"
                :columnFilter="true"
                :columnFilterLang="columnFilterLang"
                :hasCheckbox="true"
                @rowClick="navigateWithData"
                sortColumn="name"
                skin="whitespace-nowrap bh-table-hover"
                firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
            >
                <template #kyhoc="data" v-if="page === 'semester'">
                    <input type="checkbox" :checked="data.value.kyhoc" disabled style="opacity: 1 !important; position: sticky !important; width: 16px !important; ">
                </template>
                <template #lop="data" v-else-if="page === 'student_cohort'">
                    <span v-if="data.value.lop.length !== 0" v-for="lop in splitString(data.value.lop)" class="badge badge-outline-dark mr-1 rounded-2xl">{{lop}}</span>
                </template>
            </vue3-datatable>
        </div>
    </div>
</template>

<style>
    .bh-table-responsive {
        min-height: 400px !important;
    }
    .bh-filter-menu button.active,
    .bh-filter-menu button:hover {
        color: #f58236;
    }

</style>
