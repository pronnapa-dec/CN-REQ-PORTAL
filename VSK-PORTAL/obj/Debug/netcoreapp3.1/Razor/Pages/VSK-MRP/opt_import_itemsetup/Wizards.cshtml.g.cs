#pragma checksum "D:\Project\vsk-project\MIS-PORTAL-8099\CN-REQ-PORTAL\VSK-PORTAL\Pages\VSK-MRP\opt_import_itemsetup\Wizards.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "97387c5427b147f22699844e12c61ac0dc851db0"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.VSK_MRP.opt_import_itemsetup.Pages_VSK_MRP_opt_import_itemsetup_Wizards), @"mvc.1.0.view", @"/Pages/VSK-MRP/opt_import_itemsetup/Wizards.cshtml")]
namespace MIS_PORTAL.Pages.VSK_MRP.opt_import_itemsetup
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"97387c5427b147f22699844e12c61ac0dc851db0", @"/Pages/VSK-MRP/opt_import_itemsetup/Wizards.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_VSK_MRP_opt_import_itemsetup_Wizards : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
                                    <h5 class=""tx-13 tx-white-8 mb-3"">???????????????????????????????????????</h5>
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
                                    <h5 class=""tx-13 tx-white-8 mb-3"">???????????????????????????????????????</h5>
                                    <h2 class=""counter mb-0 text-white"" id=""countitem_incomplete"">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""col-lg-3 col-md-6"">
                    <div class=""card  bg-warning-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex m");
            WriteLiteral(@"d-mb-0"">
                                <div class=""counter-icon text-success"">
                                    <i class=""icon icon-emotsmile""></i>
                                </div>
                                <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">??????????????????????????????????????????????????????</h5>
                                    <h2 class=""counter mb-0 text-white"" id=""countitem_problem"">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""col-lg-3 col-md-6"">
                    <div class=""card  bg-success-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex md-mb-0"">
                                <div class=""counter-icon text-primary"">
                                    <i class=""icon icon-docs""></i>
                                </div>
  ");
            WriteLiteral(@"                              <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">????????????????????????????????????</h5>
                                    <h2 class=""counter mb-0 text-white"" id=""countitem_complete"">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- row closed -->
            <section>

                <div class=""row row-sm"">
                    <div class=""col-md-12"">
                        <div class=""border-top my-3""></div>
                        <div class=""mg-t-20"">
                            <table id=""tbl-list-temp"" class=""table table-responsive table-striped mg-b-0 text-md-nowrap"">
                                <thead style=""display:block;"">
                                    <tr>
                                        <th style=""width:70px;text-align:center;"">#</th>
                          ");
            WriteLiteral(@"              <th style=""width:90px;text-align:center;"">Status</th>
                                        <th style=""width:190px;text-align:center;"">Item Code</th>
                                        <th style=""width:390px;text-align:center;"">Item Name</th>
                                        <th style=""width:210px;text-align:left;"">Remark</th>
                                        <th style=""width:100px;text-align:center;"">Max</th>
                                        <th style=""width:100px;text-align:center;"">Min</th>
                                        <th style=""width:100px;text-align:center;"">Replenish Status</th>
                                        <th style=""width:110px;text-align:center;"">Action</th>
                                    </tr>
                                </thead>
                                <tbody id=""tbl-list-temp-tbody"" style=""display: block; max-height: 500px; overflow-y: auto;"">
                                </tbody>
                     ");
            WriteLiteral("       </table>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </section>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n");
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
