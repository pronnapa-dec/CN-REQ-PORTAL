#pragma checksum "D:\Project\vsk-project\MIS-PORTAL-8099\CN-REQ-PORTAL\VSK-PORTAL\Pages\VSK-IVC\cn-req-job\cn-req-lists\List.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "03a55101d06027f0257db5671512e2faa19a2a7d"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.VSK_IVC.cn_req_job.cn_req_lists.Pages_VSK_IVC_cn_req_job_cn_req_lists_List), @"mvc.1.0.view", @"/Pages/VSK-IVC/cn-req-job/cn-req-lists/List.cshtml")]
namespace MIS_PORTAL.Pages.VSK_IVC.cn_req_job.cn_req_lists
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\Project\vsk-project\MIS-PORTAL-8099\CN-REQ-PORTAL\VSK-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"03a55101d06027f0257db5671512e2faa19a2a7d", @"/Pages/VSK-IVC/cn-req-job/cn-req-lists/List.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_VSK_IVC_cn_req_job_cn_req_lists_List : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""col-12 col-sm-12"">
    <div class=""card"">
        <div class=""card-header pb-0 "">
            <div class=""row"">
                <div class=""col-sm-6"">
                    <h5 class=""card-title"" id=""tiltle-table"">รายการรับคืนประจำวัน</h5>
                </div>
                <div class=""col-sm-6"">
                    <div class=""tx-right"">ข้อมูลล่าสุด เมื่อ : <span id=""last_update""></span></div>
                </div>
            </div>
        </div>
        <div class=""card-body"">
            <div class=""table-responsive"">
                <table id=""tbl-prejob_list"" class=""table table-bordered mg-b-0 text-md-nowrap"">
                    <thead style=""font-size:12px; text-align:center"">
                        <tr>
                            <th width=""7%"" class=""tx-center"">เวลา</th>
                            <th width=""9%"" class=""tx-center"">เลยที่ใบเสร็จ</th>
                            <th>ข้อมูลสินค้า</th>
                            <th width=""6%"" class=""tx-center"">Qty");
            WriteLiteral(@".</th>
                            <th width=""5%"" class=""tx-center"">WH</th>
                            <th width=""9%"" class=""tx-center"">การรับแจ้ง</th>
                            <th width=""25%"">สาเหตุ</th>
                            <th width=""8%"" class=""tx-center"">โดย</th>
                        </tr>
                    </thead>
                    <tbody style=""font-size:12px; text-align:center"">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
