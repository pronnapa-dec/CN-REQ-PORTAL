#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\ACC\mas_import_pricelist\Wizards.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "c796d93e4ace240c458ed709e23d42021028bcc6"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.ACC.mas_import_pricelist.Pages_ACC_mas_import_pricelist_Wizards), @"mvc.1.0.view", @"/Pages/ACC/mas_import_pricelist/Wizards.cshtml")]
namespace MIS_PORTAL.Pages.ACC.mas_import_pricelist
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"c796d93e4ace240c458ed709e23d42021028bcc6", @"/Pages/ACC/mas_import_pricelist/Wizards.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_ACC_mas_import_pricelist_Wizards : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""col-lg-12 col-md-12"" id=""wizards"">
    <div class=""card"">
        <div id=""import"" align=""right"">

        </div>
        <div class=""card-body"">
            <div class=""row"">
                <div class=""col-lg-3 col-md-6"">
                    <div class=""card  bg-primary-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex md-mb-0"">
                                <div class=""counter-icon"">
                                    <i class=""icon icon-people""></i>
                                </div>
                                <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">ข้อมูลทั้งหมด</h5>
                                    <h2 class=""counter mb-0 text-white"" id=""countitem_all"">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div cl");
            WriteLiteral(@"ass=""col-lg-3 col-md-6"">
                    <div class=""card  bg-danger-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex md-mb-0"">
                                <div class=""counter-icon text-warning"">
                                    <i class=""icon icon-rocket""></i>
                                </div>
                                <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">ข้อมูลผิดพลาด</h5>
                                    <h2 class=""counter mb-0 text-white"" id=""countitem_incomplete"">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""col-lg-3 col-md-6"">
                    <div class=""card  bg-success-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex m");
            WriteLiteral(@"d-mb-0"">
                                <div class=""counter-icon text-primary"">
                                    <i class=""icon icon-docs""></i>
                                </div>
                                <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">ข้อมูลสำเร็จ</h5>
                                    <h2 class=""counter mb-0 text-white"" id=""countitem_complete"">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""col-lg-3 col-md-6"">
                    <div class=""card  bg-warning-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex md-mb-0"">
                                <div class=""counter-icon text-success"">
                                    <i class=""icon icon-emotsmile""></i>
                                </div>
       ");
            WriteLiteral(@"                         <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">ข้อมูลที่ต้องแก้ไข</h5>
                                    <h2 class=""counter mb-0 text-white"" id=""countitem_problem"">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- row closed -->
            <div id=""wizard1"">
                <h3>รายการข้อมูลทั้งหมด</h3>
                <section>

                    <div class=""row row-sm "">
                        <div class=""col-sm-7 col-md-6 col-lg-4"">
                            <div class=""custom-file"">
                                <input class=""custom-file-input"" id=""customFile"" type=""file""> <label class=""custom-file-label"" for=""customFile"">Choose file</label>
                            </div>
                        </div>
                        <div class=""col-sm-5 col-md-6 col");
            WriteLiteral("-lg-8\">\r\n                            <button type=\"button\" id=\"btn_downloadtemplate\" class=\"col-sm-2 btn btn-sm btn-primary btn-with-icon btn-block\">Download Template</button>\r\n");
            WriteLiteral(@"                        </div>
                    </div>

                    <div class=""row row-sm"">
                        <div class=""col-md-12"">
                            <div class=""border-top my-3""></div>
                            <div class=""mg-t-20"">
                                <table id=""tbl-list-temp"" class=""table table-responsive table-bordered table-striped  mg-b-0 text-md-nowrap "">
                                    <thead>
                                        <tr>
                                            <th>#<br />&nbsp;</th>
                                            <th>Status<br />&nbsp;</th>
                                            <th><div style=""width: 90px;text-align:center;"">Part Number<br />&nbsp;</div></th>
                                            <th><div style=""width: 100px;text-align:center;"">Brand<br />&nbsp;</div></th>
                                            <th><div style=""width: 100px;text-align:center;"">Model<br />&nbsp;</div></th>
 ");
            WriteLiteral(@"                                           <th><div style=""width: 150px;text-align:center;"">Itemname (EN)<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;"">Itemname (TH)<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">price<br />&nbsp;</div></th>
                                            <th><div style=""width: 100px;text-align:center;"">Effective Date<br />&nbsp;</div></th>
                                    </thead>
                                    <tbody id=""tbl-list-temp-tbody"">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                <h3>รายการที่สามารนำเข้าได้</h3>
                <section>
                    <div class=""row row-sm"">
                        <div class=""col-md-12"">
       ");
            WriteLiteral(@"                     <div class=""border-top my-3""></div>
                            <div class=""mg-t-20"">
                                <table id=""tbl-list-temp"" class=""table table-responsive table-bordered table-striped  mg-b-0 text-md-nowrap "">
                                    <thead>
                                        <tr>
                                            <th>#<br />&nbsp;<br />&nbsp;</th>
                                            <th>Status<br />&nbsp;<br />&nbsp;</th>
                                            <th><div style=""width: 90px;text-align:center;"">Part Number<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 100px;text-align:center;"">Brand<br />&nbsp;<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 100px;text-align:center;"">Model<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div styl");
            WriteLiteral(@"e=""width: 150px;text-align:center;"">Itemname (EN)<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;"">Itemname (TH)<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">price<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 100px;text-align:center;"">Effective Date<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                <h3>รายการที่นำเข้าสำเร็จแล้ว</h3>
                <section>
                    <div class=""row ro");
            WriteLiteral(@"w-sm"">
                        <div class=""col-md-12"">
                            <div class=""border-top my-3""></div>
                            <div class=""mg-t-20"">
                                <table id=""tbl-list-temp"" class=""table table-responsive table-bordered table-striped  mg-b-0 text-md-nowrap "">
                                    <thead>
                                        <tr>
                                            <th>#<br />&nbsp;<br />&nbsp;</th>
                                            <th>Status<br />&nbsp;<br />&nbsp;</th>
                                            <th><div style=""width: 90px;text-align:center;"">Part Number<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 100px;text-align:center;"">Brand<br />&nbsp;<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 100px;text-align:center;"">Model<br />&nbsp;<br />&nbsp;<br />&nbsp;</div>");
            WriteLiteral(@"</th>
                                            <th><div style=""width: 150px;text-align:center;"">Itemname (EN)<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;"">Itemname (TH)<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">price<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 100px;text-align:center;"">Effective Date<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
        <div clas");
            WriteLiteral("s=\"border-top my-3\"></div>\r\n        <div class=\"table-responsive mg-t-20\">\r\n            <table id=\"tbl-list\" class=\"table table-bordered table-striped table-hover mg-b-0 text-md-nowrap\"></table>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
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
