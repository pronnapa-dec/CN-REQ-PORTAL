#pragma checksum "D:\Project\vsk-project\MIS-PORTAL-8099\CN\VSK-PORTAL\Pages\VSK-PIT\mas_find_vehicle\Modal_CarModel_import.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "ec431618b7a061ac77498939523504be7356ae6d"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.VSK_PIT.mas_find_vehicle.Pages_VSK_PIT_mas_find_vehicle_Modal_CarModel_import), @"mvc.1.0.view", @"/Pages/VSK-PIT/mas_find_vehicle/Modal_CarModel_import.cshtml")]
namespace MIS_PORTAL.Pages.VSK_PIT.mas_find_vehicle
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
#line 1 "D:\Project\vsk-project\MIS-PORTAL-8099\CN\VSK-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ec431618b7a061ac77498939523504be7356ae6d", @"/Pages/VSK-PIT/mas_find_vehicle/Modal_CarModel_import.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_VSK_PIT_mas_find_vehicle_Modal_CarModel_import : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<!-- Scroll with content modal -->
<div class=""modal effect-flip-vertical"" id=""modal-carmodel_upload"" data-keyboard=""false"" data-backdrop=""static"">
    <div class=""modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered"" role=""document"">
        <div class=""modal-content modal-content-demo"" style=""width: 120%"">

            <div class=""modal-header justify-content-between"">
                <div class=""my-auto"">
                    <div class=""d-flex"">
                        <span class=""modal-title"" style=""font-size:14px;"">ตาราง CarModel</span>
                    </div>
                </div>
                <div class=""main-dashboard-header-right"">
                    <div>
                        <label class=""tx-13"">ข้อมูลทั้งหมด</label>
                        <div><h5 id=""all_information"">0</h5>รายการ</div>
                    </div>
                    <div>
                        <label class=""tx-13"">ข้อมูลผิดพลาด</label>
                        <div><h5 id=""wrong_infor");
            WriteLiteral(@"mation"">0</h5> หน่วย</div>
                    </div>
                    <div>
                        <label class=""tx-13"">ข้อมูลสำเร็จ</label>
                        <div><h5 id=""success_information"">0</h5> หน่วย</div>
                    </div>
                </div>

                <div class=""d-flex my-xl-auto right-content"">
                    <!--
                    <div class=""mb-6 mb-xl-0"" style=""margin-right: 20px;"">
                        <button type=""button"" id=""btn_downloadtemplate"" target=""_blank"" class=""btn btn-outline-primary btn-block"">Download Template</button>
                    </div>
                        -->
                    <div class=""mb-6 mb-xl-0"">
                        <button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                    </div>
                </div>

            </div>
            <div class=""modal-body"">
                <div class=""row"">
                 ");
            WriteLiteral(@"   <div class=""col-12"">
                        <div class=""card card-primary"">
                            <div class=""card-body"">
                                <div class=""form-group"">
                                    <div class=""row"">
                                        <div class=""col-md-3 text-xl-right"" style=""margin-top:5px;"">
                                            <label class=""form-label"">File Upload <span class=""tx-danger"">*</span></label>
                                        </div>
                                        <div class=""col-md-6"">
                                            <div class=""custom-file"">
                                                <input class=""custom-file-input"" id=""customFile"" type=""file""> <label class=""custom-file-label"" for=""customFile"">Choose file</label>
                                            </div>
                                        </div>
                                        <div class=""col-sm-2"">
                      ");
            WriteLiteral(@"                      <button type=""button"" id=""btn_downloadtemplate"" target=""_blank"" class=""btn btn-outline-primary btn-block"">Download Template</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""col-12 tbl-carmodel-import d-none"">
                        <div class=""card card-success"">
                            <div class=""card-body"">
                                <table id=""tbl-carmodel_import"" class=""table table-striped table-hover mg-b-0 text-md-nowrap"" width=""100%"">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Action</th>
                                            <th>STATUS</th>
                                            <th styl");
            WriteLiteral("e=\"width:500px;\"></th>\r\n");
            WriteLiteral(@"                                            <th>model id</th>
                                            <th>model mixed</th>
                                            <th>gnamechr</th>
                                            <th>cartype</th>
                                            <th>Vehicle Brand</th>
");
            WriteLiteral(@"                                            <th>Vehicle Model</th>
                                            <th>Model Change</th>
                                            <th>Minor Change</th>
                                            <th>Fuel Type</th>
                                            <th>Engine Displacement</th>
                                            <th>Engine Code</th>
                                            <th>Trnasmission Type</th>
                                            <th>Body type</th>
                                            <th>High Stant</th>
                                            <th>Wheel Drive</th>
                                            <th>Street Name</th>
                                            <th>Model Code</th>
                                            <th>Remarks</th>
                                            <th>ID</th>
                                        </tr>
                                    </thead>
        ");
            WriteLiteral(@"                            <tbody></tbody>
                                </table>
                            </div>
                        </div>

                        <div class=""col-sm-12"">
                            <button id=""btn_update-data"" class=""btn btn-outline-success btn-block btn_update-data"" type=""submit"">Export</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
<!--End Scroll with content modal -->
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
