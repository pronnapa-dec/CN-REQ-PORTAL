#pragma checksum "D:\Project\vsk-project\MIS-PORTAL-8099\CN-REQ-PORTAL\VSK-PORTAL\Pages\VSK-STL\stl-import_customer_masterdatabysales\Wizards.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "276f16609f221d3243e03eda691df1b643230547"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.VSK_STL.stl_import_customer_masterdatabysales.Pages_VSK_STL_stl_import_customer_masterdatabysales_Wizards), @"mvc.1.0.view", @"/Pages/VSK-STL/stl-import_customer_masterdatabysales/Wizards.cshtml")]
namespace MIS_PORTAL.Pages.VSK_STL.stl_import_customer_masterdatabysales
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"276f16609f221d3243e03eda691df1b643230547", @"/Pages/VSK-STL/stl-import_customer_masterdatabysales/Wizards.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_VSK_STL_stl_import_customer_masterdatabysales_Wizards : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
                <div clas");
            WriteLiteral(@"s=""col-lg-3 col-md-6"">
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
                    <div class=""card  bg-success-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex md-");
            WriteLiteral(@"mb-0"">
                                <div class=""counter-icon text-primary"">
                                    <i class=""icon icon-docs""></i>
                                </div>
                                <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">????????????????????????????????????</h5>
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
            WriteLiteral(@"                       <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">??????????????????????????????????????????????????????</h5>
                                    <h2 class=""counter mb-0 text-white"" id=""countitem_problem"">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- row closed -->
            <div id=""wizard1"">
                <h3>?????????????????????????????????????????????????????????</h3>
                <section>

                    <div class=""row row-sm"">
                        <div class=""col-sm-4 col-md-4 col-lg-4"">
                            <div class=""custom-file"">
                                <input class=""custom-file-input"" id=""customFile"" type=""file""> <label class=""custom-file-label"" for=""customFile"">Choose file</label>
                            </div>
                        </div>
                        <div class=""row row-sm col-sm-8 col-");
            WriteLiteral(@"md-8 col-lg-8"">
                            <button type=""button"" id=""btn_downloadtemplate"" class=""col-sm-2 btn btn-sm btn-primary btn-with-icon btn-block"">Download Template</button>
                            &nbsp;&nbsp;&nbsp;
                            <button type=""button"" id=""btn_downloadsalemasterdata"" class=""col-sm-3 btn btn-sm btn-success btn-with-icon btn-block"" style=""margin-top: 0px;"">Download Sales MasterData</button>
                        </div>
                    </div>

                    <div class=""row row-sm"">
                        <div class=""col-md-12"">
                            <div class=""border-top my-3""></div>
                            <div class=""mg-t-20"">
                                <table id=""tbl-list-customersalemasterdatabysales"" class=""table table-responsive table-bordered table-striped mg-b-0 text-md-nowrap"">
                                    <thead>
                                        <tr>
                                            <th><div ");
            WriteLiteral(@"style=""width: 30px;text-align:center;""><br />&nbsp;#<br />&nbsp;</div></th>
                                            <th><div style=""width: 120px;text-align:center;""><br />&nbsp;Status<br />&nbsp;</div></th>
                                            <th><div style=""width: 120px;text-align:center;""><br />&nbsp;Action<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;""><br />&nbsp;Sale Code<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;""><br />&nbsp;Sale Name<br />&nbsp;</div></th>
");
            WriteLiteral(@"                                            <th><div style='width: 150px;text-align:center;'><br />&nbsp;Sale Manager<br />&nbsp;</div></th>
                                            <th><div style='width: 150px;text-align:center;'><br />&nbsp;Sale Supervisor<br />&nbsp;</div></th>
                                            <th><div style='width: 150px;text-align:center;'><br />&nbsp;Sale Representative<br />&nbsp;</div></th>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                <h3>?????????????????????????????????????????????????????????????????????</h3>
                <section>
                    <div class=""row row-sm"">
                        <div class=""col-md-12"">
                            <div class=""border-top my-3""></div>
                            <div class=""mg-t-2");
            WriteLiteral(@"0"">
                                <table id=""tbl-list-customersalemasterdatabysales"" class=""table table-responsive table-bordered table-striped  mg-b-0 text-md-nowrap "">
                                    <thead>
                                        <tr>
                                            <th><div style=""width: 30px;text-align:center;""><br />&nbsp;#<br />&nbsp;</div></th>
                                            <th><div style=""width: 120px;text-align:center;""><br />&nbsp;Status<br />&nbsp;</div></th>
                                            <th><div style=""width: 120px;text-align:center;""><br />&nbsp;Action<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;""><br />&nbsp;Sale Code<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;""><br />&nbsp;Sale Name<br />&nbsp;</div></th>
");
            WriteLiteral(@"                                            <th><div style='width: 150px;text-align:center;'><br />&nbsp;Sale Manager<br />&nbsp;</div></th>
                                            <th><div style='width: 150px;text-align:center;'><br />&nbsp;Sale Supervisor<br />&nbsp;</div></th>
                                            <th><div style='width: 150px;text-align:center;'><br />&nbsp;Sale Representative<br />&nbsp;</div></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                <h3>???????????????????????????????????????????????????????????????????????????</h3>
                <section>
                    <div class=""row row-sm"">
                        <div class=""col-md-12"">
                            <div class=""border-top my-3""></div");
            WriteLiteral(@">
                            <div class=""mg-t-20"">
                                <table id=""tbl-list-customersalemasterdatabysales"" class=""table table-responsive table-bordered table-striped  mg-b-0 text-md-nowrap "">
                                    <thead>
                                        <tr>
                                            <th><div style=""width: 30px;text-align:center;""><br />&nbsp;#<br />&nbsp;</div></th>
                                            <th><div style=""width: 120px;text-align:center;""><br />&nbsp;Status<br />&nbsp;</div></th>
                                            <th><div style=""width: 120px;text-align:center;""><br />&nbsp;Action<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;""><br />&nbsp;Sale Code<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;""><br />&nbsp;Sale Name<br />&nbsp;</div></th>
");
            WriteLiteral(@"                                            <th><div style='width: 150px;text-align:center;'><br />&nbsp;Sale Manager<br />&nbsp;</div></th>
                                            <th><div style='width: 150px;text-align:center;'><br />&nbsp;Sale Supervisor<br />&nbsp;</div></th>
                                            <th><div style='width: 150px;text-align:center;'><br />&nbsp;Sale Representative<br />&nbsp;</div></th>
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
        <div class=""border-top my-3""></div>
        <div class=""table-responsive mg-t-20"">
            <table id=""tbl-list-customersalemasterdatabysales"" class=""table table-bordered table-striped ta");
            WriteLiteral("ble-hover mg-b-0 text-md-nowrap\"></table>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
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
