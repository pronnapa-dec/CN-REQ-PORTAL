#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\INV\inv-tax-hearder\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "87859236ef0c210675180a17ac89b4dd5398167a"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.INV.inv_tax_hearder.Pages_INV_inv_tax_hearder_Index), @"mvc.1.0.razor-page", @"/Pages/INV/inv-tax-hearder/Index.cshtml")]
namespace MIS_PORTAL.Pages.INV.inv_tax_hearder
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("RouteTemplate", "/inv-app/tax-list")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"87859236ef0c210675180a17ac89b4dd5398167a", @"/Pages/INV/inv-tax-hearder/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_INV_inv_tax_hearder_Index : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "~/Pages/INV/inv-tax-hearder/List.cshtml", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.PartialTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 3 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\INV\inv-tax-hearder\Index.cshtml"
  
    ViewData["Script"] = "apps/inv/tax_hearder_list.js";

    ViewData["Title"] = "Index";
    ViewData["Content-Title"] = "Invoice Tax";
    ViewData["Content-Title-Page"] = "Invoice Tax";


#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n");
            WriteLiteral("<div class=\"container\">\r\n\r\n");
            WriteLiteral("    <div class=\"breadcrumb-header justify-content-between\">\r\n\r\n");
            WriteLiteral("        <div class=\"my-auto\">\r\n            <div class=\"d-flex\">\r\n                <h4 class=\"content-title mb-0 my-auto\">");
#nullable restore
#line 21 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\INV\inv-tax-hearder\Index.cshtml"
                                                  Write(ViewData["Content-Title"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("</h4><span class=\"text-muted mt-1 tx-13 ml-2 mb-0\">/ ");
#nullable restore
#line 21 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\INV\inv-tax-hearder\Index.cshtml"
                                                                                                                                 Write(ViewData["Content-Title-Page"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("</span>\r\n            </div>\r\n        </div>\r\n");
            WriteLiteral(@"        <div class=""d-flex my-xl-auto right-content"">
            <div class=""mb-3 mb-xl-0"">
                <a href=""#"" id=""add-inv-head"" class=""btn btn-success"" ><i class=""typcn typcn-document-add""></i> New Invoice</a>            
            </div>
        </div>
");
            WriteLiteral("\r\n    </div>\r\n");
            WriteLiteral("\r\n");
            WriteLiteral("    <div id=\"card-datatables\" class=\"row\">\r\n        ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("partial", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "87859236ef0c210675180a17ac89b4dd5398167a5365", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.PartialTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper.Name = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n    </div>\r\n");
            WriteLiteral("\r\n");
            WriteLiteral("    <!--<div id=\"card-form\" class=\"row\">\r\n        <partial name=\"~/Pages/INV/inv-tax/Form.cshtml\" />\r\n    </div>-->\r\n");
            WriteLiteral("\r\n</div>\r\n");
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<Pages_INV_inv_tax_hearder_Index> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Pages_INV_inv_tax_hearder_Index> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Pages_INV_inv_tax_hearder_Index>)PageContext?.ViewData;
        public Pages_INV_inv_tax_hearder_Index Model => ViewData.Model;
    }
}
#pragma warning restore 1591