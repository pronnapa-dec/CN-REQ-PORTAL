#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\MAS\mas_gcode\tab\gcode_cexp.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "edbdd9d51ca4c3d1dd86d0655698599e65f1a4ab"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.MAS.mas_gcode.tab.Pages_MAS_mas_gcode_tab_gcode_cexp), @"mvc.1.0.view", @"/Pages/MAS/mas_gcode/tab/gcode_cexp.cshtml")]
namespace MIS_PORTAL.Pages.MAS.mas_gcode.tab
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"edbdd9d51ca4c3d1dd86d0655698599e65f1a4ab", @"/Pages/MAS/mas_gcode/tab/gcode_cexp.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_MAS_mas_gcode_tab_gcode_cexp : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""tab-pane"" id=""gcode_cexp"" style=""font-size: 13px;"">
    <div class=""row"">
        <div class=""col-sm-12"">
            <div class=""row mg-t-15"">
                <div class=""col-sm-5 mg-t-10"">
                    <div class=""card card-info "">
                        <div class=""card-header pb-0 d-flex flex-row justify-content-between"">
                            <span class=""card-title mb-0 pb-0"">เพิ่มข้อมูลรหัสสินค้าพ่วง Code 3</span>
                            <div class=""col-sm-6 col-md-3 mg-t-10 mg-md-t-0"">
                                <button id=""btn-event-create"" class=""btn btn-info btn-block btn-event-create"" ");
            WriteLiteral(@" type=""submit""><i class=""fas fa-plus""></i> Create</button>
                            </div>
                        </div>
                        <div class=""card-body"">
                            <div class=""col-form alert alert-warning ck-code d-none"" role=""alert"">
                                <span class=""alert-inner--icon""><i class=""fe fe-info""></i></span>
                                <span class=""alert-inner--text""><strong>Warning!</strong> รหัสสินค้าซ้ำ กรุณาเปลี่ยนใหม่!</span>
                            </div>
                            <div class=""row gcode_code"">
                                <label class=""col-sm-12 col-form-label tx-left"">Product Code - รหัสสินค้า <span class=""tx-danger"">*</span></label>
                                <div class=""col-sm-12"">
                                    <input type=""text"" maxlength=""4"" class=""form-control form-control-sm bd-info"" id=""gcode_cexp_code"" name=""gcode_cexp_code""");
            BeginWriteAttribute("placeholder", " placeholder=\"", 1637, "\"", 1651, 0);
            EndWriteAttribute();
            WriteLiteral(@" required>
                                </div>
                            </div>

                            <div class=""row mg-t-6 gcode_name"">
                                <label class=""col-sm-12 col-form-label tx-left"">Product Name - ชื่อสินค้า<span class=""tx-danger"">*</span></label>
                                <div class=""col-sm-12"">
                                    <input type=""text"" class=""form-control form-control-sm bd-info"" id=""gcode_cexp_name"" name=""gcode_cexp_name""");
            BeginWriteAttribute("placeholder", " placeholder=\"", 2154, "\"", 2168, 0);
            EndWriteAttribute();
            WriteLiteral(" required>\r\n                                </div>\r\n                            </div>\r\n\r\n");
            WriteLiteral(@"
                            <div class=""form-group mb-0 mt-3 d-flex flex-row justify-content-center float-center"">
                                <div class=""col-sm-6 col-md-3 d-btn-create"">
                                    <button id=""btn-create"" class=""btn btn-success btn-block btn-create btn-action"" data-action=""save_exit"" type=""submit"">Add</button>
                                </div>
                                <div class=""col-sm-6 col-md-3 d-btn-update"">
                                    <button id=""btn-update"" class=""btn btn-primary btn-block btn-update btn-action"" data-action=""save_exit"" type=""submit"">Updata</button>
                                </div>
                                <div class=""col-sm-6 col-md-3 d-btn-reset"">
                                    <button id=""btn-reset"" class=""btn btn-danger btn-block btn-reset reset btn-action"" type=""reset"">Reset</button>
                                </div>
                            </div>

                        </di");
            WriteLiteral(@"v>

                    </div>
                </div>

                <div class=""col-sm-7 mg-t-10"">
                    <div class=""card card-info"">
                        <div class=""card-header pb-0"">
                            <span class=""card-title mb-0 pb-0"">ตารางข้อมูลรหัสสินค้าพ่วง Code 3</span>
                        </div>
                        <div class=""card-body"">
                            <div class=""tablekk-responsive mg-t-20"">
                                <table id=""tbl-list_gcode_cexp"" class=""table table-bordered table-striped table-hover mg-b-0 text-md-nowrap""></table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>");
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
