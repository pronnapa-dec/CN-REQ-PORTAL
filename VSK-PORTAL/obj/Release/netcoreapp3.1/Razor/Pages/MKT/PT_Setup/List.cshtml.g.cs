#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\MKT\PT_Setup\List.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "7311db1a01b6f25fcf85e87256e2a0ffe7a9cdec"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.MKT.PT_Setup.Pages_MKT_PT_Setup_List), @"mvc.1.0.view", @"/Pages/MKT/PT_Setup/List.cshtml")]
namespace MIS_PORTAL.Pages.MKT.PT_Setup
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7311db1a01b6f25fcf85e87256e2a0ffe7a9cdec", @"/Pages/MKT/PT_Setup/List.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_MKT_PT_Setup_List : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""col-12 col-sm-12"">
    <div class=""card"">
        <div class=""card-header pb-0"">
            <div class=""justify-content-between row "">
                <div class=""my-auto"">
                    <div class=""d-flex"">
                        <h5 class=""card-title mb-0 pb-0"">");
#nullable restore
#line 7 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\MKT\PT_Setup\List.cshtml"
                                                    Write(ViewData["Content-Title-Page"]);

#line default
#line hidden
#nullable disable
            WriteLiteral(@"</h5>
                    </div>
                </div>
                <div class=""d-flex my-xl-auto right-content"">
                    <div class=""mb-3 mb-xl-0"">
                        <button id=""btn-add"" class=""btn btn-primary btn-with-icon btn-block"" data-toggle=""modal"" data-target=""#modal-frm_data""><i class=""typcn typcn-document-add""></i> ADD +</button>
                    </div>
                </div>

            </div>
        </div>
        <div class=""border-top my-3""></div>
        <div class=""card-body"">
            <table id=""tbl-list"" class=""table table-hover text-md-nowrap""></table>
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
