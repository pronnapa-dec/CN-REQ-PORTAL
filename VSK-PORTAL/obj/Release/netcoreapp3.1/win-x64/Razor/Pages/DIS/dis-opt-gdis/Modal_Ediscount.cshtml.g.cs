#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\DIS\dis-opt-gdis\Modal_Ediscount.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "78ae9b2ec7af5772413610ff24d861dda89c04bd"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.DIS.dis_opt_gdis.Pages_DIS_dis_opt_gdis_Modal_Ediscount), @"mvc.1.0.view", @"/Pages/DIS/dis-opt-gdis/Modal_Ediscount.cshtml")]
namespace MIS_PORTAL.Pages.DIS.dis_opt_gdis
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
#line 1 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"78ae9b2ec7af5772413610ff24d861dda89c04bd", @"/Pages/DIS/dis-opt-gdis/Modal_Ediscount.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_DIS_dis_opt_gdis_Modal_Ediscount : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<!-- Scroll with content modal -->
<div class=""modal effect-flip-vertical"" id=""modal-ediscount"" data-keyboard=""false"" data-backdrop=""static"">
    <div class=""modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered"" role=""document"">
        <div class=""modal-content modal-content-demo"">
            <div class=""modal-header"">
                <h5 class=""modal-title"">ตารางกำหนดส่วนลด</h5><button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
            </div>
            <div class=""modal-body"">
                <div class=""row"">
                    <div class=""col-12"">
                        <div class=""card card-primary"">
                            <div class=""card-body"">
                                <div class=""row"">
                                    <label class=""col-sm-2 col-form-label tx-left"">รหัส Template <span class=""tx-danger"">*</span></label>
                                    <label class=""col-sm-4 ");
            WriteLiteral(@"col-form-label tx-left"">รายละเอียด <span class=""tx-danger"">*</span></label>
                                    <label class=""col-sm-5 col-form-label tx-left"">หมายเหตุ <span class=""tx-danger"">*</span></label>
                                    <label class=""col-sm-1 col-form-label tx-left"">&nbsp;</label>

                                    <div class=""col-sm-2"">
                                        <input type=""text"" class=""form-control"" id=""onl_itemsetup_quantity"" name=""onl_itemsetup_quantity""");
            BeginWriteAttribute("placeholder", " placeholder=\"", 1533, "\"", 1547, 0);
            EndWriteAttribute();
            WriteLiteral(">\r\n                                    </div>\r\n                                    <div class=\"col-sm-4\">\r\n                                        <input type=\"text\" class=\"form-control\" id=\"onl_itemsetup_price\" name=\"onl_itemsetup_price\"");
            BeginWriteAttribute("placeholder", " placeholder=\"", 1786, "\"", 1800, 0);
            EndWriteAttribute();
            WriteLiteral(">\r\n                                    </div>\r\n                                    <div class=\"col-sm-5\">\r\n                                        <input type=\"text\" class=\"form-control\" id=\"onl_itemsetup_price\" name=\"onl_itemsetup_price\"");
            BeginWriteAttribute("placeholder", " placeholder=\"", 2039, "\"", 2053, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-1"">
                                        <button class=""btn btn-success btn-icon""><i class=""typcn typcn-document-add""></i></button>
                                        <button class=""btn btn-primary btn-icon d-none""><i class=""typcn typcn-edit""></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""col-12"">
                        <div class=""card card-success"">
                            <div class=""card-body"">
                                <table id=""tbl-prnetfile-list"" class=""table table-striped table-hover mg-b-0 text-md-nowrap"" width=""100%"" >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                  ");
            WriteLiteral(@"          <th>รหัส Template</th>
                                            <th>รายละเอียด</th>
                                            <th>หมายเหตุ</th>
                                            <th>Update ราคาล่าสุดวันที่</th>
                                            <th>Update โดย</th>
                                            <th>จัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

");
            WriteLiteral("\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!--End Scroll with content modal -->\r\n");
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
