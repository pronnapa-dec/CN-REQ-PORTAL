#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\ACC\mas_import_netprice\Wizards.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "3bf1ffbe2a59cb76b532746a1cc4c2732b645225"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.ACC.mas_import_netprice.Pages_ACC_mas_import_netprice_Wizards), @"mvc.1.0.view", @"/Pages/ACC/mas_import_netprice/Wizards.cshtml")]
namespace MIS_PORTAL.Pages.ACC.mas_import_netprice
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"3bf1ffbe2a59cb76b532746a1cc4c2732b645225", @"/Pages/ACC/mas_import_netprice/Wizards.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_ACC_mas_import_netprice_Wizards : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""col-lg-12 col-md-12"">
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
                                    <h2 class=""counter mb-0 text-white"">5</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""col-lg-3 col-md-6"">
      ");
            WriteLiteral(@"              <div class=""card  bg-danger-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex md-mb-0"">
                                <div class=""counter-icon text-warning"">
                                    <i class=""icon icon-rocket""></i>
                                </div>
                                <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">ข้อมูลผิดพลาด</h5>
                                    <h2 class=""counter mb-0 text-white"">2</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""col-lg-3 col-md-6"">
                    <div class=""card  bg-success-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex md-mb-0"">
                                <div class=""coun");
            WriteLiteral(@"ter-icon text-primary"">
                                    <i class=""icon icon-docs""></i>
                                </div>
                                <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">ข้อมูลสำเร็จ</h5>
                                    <h2 class=""counter mb-0 text-white"">3</h2>
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
                                <div class=""ml-auto"">
                                  ");
            WriteLiteral(@"  <h5 class=""tx-13 tx-white-8 mb-3"">ข้อมูลที่ต้องแก้ไข</h5>
                                    <h2 class=""counter mb-0 text-white"">3</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- row closed -->
            <div id=""wizard1"">
                <h3>นำเข้าข้อมูล ขั้นตอนที่ 1</h3>
                <section>

                    <div class=""row row-sm "">
                        <div class=""col-sm-7 col-md-6 col-lg-4"">
                            <div class=""custom-file"">
                                <input class=""custom-file-input"" id=""customFile"" type=""file""> <label class=""custom-file-label"" for=""customFile"">Choose file</label>
                            </div>
                        </div>
                    </div>

                    <div class=""row row-sm"">
                        <div class=""col-md-12"">
                            <di");
            WriteLiteral(@"v class=""border-top my-3""></div>
                            <div class=""mg-t-20"">
                                <table id=""tbl-list-temp"" class=""table table-responsive table-bordered table-striped  mg-b-0 text-md-nowrap "">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th><div style=""width: 190px;text-align:center;"">Product Code <br /> รหัสสินค้า</div></th>
                                            <th><div style=""width: 360px;text-align:center;"">Product Name <br /> ชื่อสินค้า</div></th>
");
            WriteLiteral(@"                                            <th><div style=""width: 60px;text-align:center;"">QTY-A <br /></div></th>
                                            <th><div style=""width: 60px;text-align:center;"">QTY-B <br /></div></th>
                                            <th><div style=""width: 90px;text-align:center;"">Net Price <br /></div></th>
                                            <th><div style=""width: 60px;text-align:center;"">Qty Small <br /></div></th>
                                            <th><div style=""width: 90px;text-align:center;"">UOM <br /></div></th>
");
            WriteLiteral(@"                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                <h3>ตรวจสอบข้อมูล ขั้นตอนที่ 2</h3>
                <section>
                    <div class=""row row-sm"">
                        <div class=""col-md-12"">
                            <div class=""border-top my-3""></div>
                            <div class=""mg-t-20"">
                                <table id=""tbl-list-temp"" class=""table table-responsive table-bordered table-striped  mg-b-0 text-md-nowrap "">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th><div style=""width: 190px;text-align:center");
            WriteLiteral(@";"">Product Code <br /> รหัสสินค้า</div></th>
                                            <th><div style=""width: 360px;text-align:center;"">Product Name <br /> ชื่อสินค้า</div></th>
                                            <th><div style=""width: 150px;text-align:center;"">Barcode <br /></div></th>
                                            <th><div style=""width: 150px;text-align:center;"">Supplier Code <br /> รหัสผู้ผลิต</div></th>
                                            <th><div style=""width: 60px;text-align:center;"">QTY-A <br /></div></th>
                                            <th><div style=""width: 60px;text-align:center;"">QTY-B <br /></div></th>
                                            <th><div style=""width: 90px;text-align:center;"">Net Price <br /></div></th>
                                            <th><div style=""width: 60px;text-align:center;"">Qty Small <br /></div></th>
                                            <th><div style=""width: 90px;text-align:center;"">UOM <br /></div>");
            WriteLiteral(@"</th>
                                            <th><div style=""width: 150px;text-align:center;"">Std.Cost <br /></div></th>
                                            <th><div style=""width: 150px;text-align:center;"">Created by <br /></div></th>
                                            <th><div style=""width: 150px;text-align:center;"">Created Date <br /></div></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                <h3>Payment Details</h3>
                <section>
                    TAB 3
                </section>
            </div>
        </div>
        <div class=""border-top my-3""></div>
        <div class=""table-responsive mg-t-20"">
            <table id=""tbl-list"" class=""table");
            WriteLiteral(" table-bordered table-striped table-hover mg-b-0 text-md-nowrap\"></table>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
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
