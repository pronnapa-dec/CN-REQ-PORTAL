#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\MRP\opt_item_setup\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "6a06b2f9cc7ba660af0e2ec23b96f092e98d8196"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.MRP.opt_item_setup.Pages_MRP_opt_item_setup_Index), @"mvc.1.0.razor-page", @"/Pages/MRP/opt_item_setup/Index.cshtml")]
namespace MIS_PORTAL.Pages.MRP.opt_item_setup
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("RouteTemplate", "/mrp/itemsetup")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"6a06b2f9cc7ba660af0e2ec23b96f092e98d8196", @"/Pages/MRP/opt_item_setup/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_MRP_opt_item_setup_Index : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "~/Pages/MRP/opt_item_setup/List.cshtml", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "~/Pages/MRP/opt_item_setup/Form.cshtml", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "~/Pages/MRP/opt_item_setup/Form_Schedule.cshtml", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
#line 3 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\MRP\opt_item_setup\Index.cshtml"
  
    ViewData["Script"] = "apps/mrp/mrp-opt-itemsetup.js";

    ViewData["Title"] = "Index";
    ViewData["Content-Title"] = "MRP";
    ViewData["Content-Title-Page"] = "Item Setup";


#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n");
            WriteLiteral("<div class=\"container\">\r\n\r\n");
            WriteLiteral("    <div class=\"breadcrumb-header justify-content-between\">\r\n\r\n");
            WriteLiteral("        <div class=\"my-auto\">\r\n            <div class=\"d-flex\">\r\n                <h4 class=\"content-title mb-0 my-auto\">");
#nullable restore
#line 21 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\MRP\opt_item_setup\Index.cshtml"
                                                  Write(ViewData["Content-Title"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("</h4><span class=\"text-muted mt-1 tx-13 ml-2 mb-0\">/ ");
#nullable restore
#line 21 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\MRP\opt_item_setup\Index.cshtml"
                                                                                                                                 Write(ViewData["Content-Title-Page"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("</span>\r\n            </div>\r\n        </div>\r\n");
            WriteLiteral(@"        <div class=""d-flex my-xl-auto right-content mb-3 mb-xl-0"">
            <div class=""row"">
                <div class=""input-group col"">
                    <div class=""custom-file"">
                        <input type=""file"" class=""custom-file-input"" name=""files[]"" id=""file-upload"" accept="".xlsx"">
                        <label class=""custom-file-label"" for=""file-upload"">Choose file</label>
                    </div>
                    <div class=""input-group-append"">
                        <button type=""button"" class=""btn btn-primary""");
            BeginWriteAttribute("id", " id=\"", 1266, "\"", 1271, 0);
            EndWriteAttribute();
            WriteLiteral(" data-toggle=\"dropdown\">Import <i class=\"icon ion-ios-arrow-down tx-11 mg-l-3\"></i></button>\r\n                        <div class=\"dropdown-menu\">\r\n                            <a");
            BeginWriteAttribute("href", " href=\"", 1449, "\"", 1456, 0);
            EndWriteAttribute();
            WriteLiteral(" class=\"dropdown-item btn-tbl_import\" data-import=\"202\">VSF<input type=\"file\" style=\"display: none;\"");
            BeginWriteAttribute("multiple", " multiple=\"", 1557, "\"", 1568, 0);
            EndWriteAttribute();
            WriteLiteral("></a>\r\n                            <a");
            BeginWriteAttribute("href", " href=\"", 1606, "\"", 1613, 0);
            EndWriteAttribute();
            WriteLiteral(" class=\"dropdown-item btn-tbl_import\" data-import=\"212\">KLH<input type=\"file\" style=\"display: none;\"");
            BeginWriteAttribute("multiple", " multiple=\"", 1714, "\"", 1725, 0);
            EndWriteAttribute();
            WriteLiteral("></a>\r\n                            <a");
            BeginWriteAttribute("href", " href=\"", 1763, "\"", 1770, 0);
            EndWriteAttribute();
            WriteLiteral(" class=\"dropdown-item btn-tbl_import\" data-import=\"211\">LKS<input type=\"file\" style=\"display: none;\"");
            BeginWriteAttribute("multiple", " multiple=\"", 1871, "\"", 1882, 0);
            EndWriteAttribute();
            WriteLiteral("></a>\r\n                            <a");
            BeginWriteAttribute("href", " href=\"", 1920, "\"", 1927, 0);
            EndWriteAttribute();
            WriteLiteral(" class=\"dropdown-item btn-tbl_import\" data-import=\"213\">LLK<input type=\"file\" style=\"display: none;\"");
            BeginWriteAttribute("multiple", " multiple=\"", 2028, "\"", 2039, 0);
            EndWriteAttribute();
            WriteLiteral("></a>\r\n                            <a");
            BeginWriteAttribute("href", " href=\"", 2077, "\"", 2084, 0);
            EndWriteAttribute();
            WriteLiteral(" class=\"dropdown-item btn-tbl_import\" data-import=\"214\">NWM<input type=\"file\" style=\"display: none;\"");
            BeginWriteAttribute("multiple", " multiple=\"", 2185, "\"", 2196, 0);
            EndWriteAttribute();
            WriteLiteral(@"></a>
                        </div>
                    </div>
                </div>
                <button id=""btn-item_create"" class=""btn btn-success "" data-toggle=""modal"" data-target=""#modal-frm_data""><i class=""typcn typcn-document-add""></i> New Item</button>
            </div>
        </div>
");
            WriteLiteral("\r\n    </div>\r\n");
            WriteLiteral("\r\n");
            WriteLiteral("    <div id=\"card-datatables\" class=\"row\">\r\n\r\n        ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("partial", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "6a06b2f9cc7ba660af0e2ec23b96f092e98d81969089", async() => {
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
            WriteLiteral("    <div id=\"card-form\" class=\"row\">\r\n        ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("partial", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "6a06b2f9cc7ba660af0e2ec23b96f092e98d819610337", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.PartialTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper.Name = (string)__tagHelperAttribute_1.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n        ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("partial", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "6a06b2f9cc7ba660af0e2ec23b96f092e98d819611462", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.PartialTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper.Name = (string)__tagHelperAttribute_2.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n    </div>\r\n");
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<Pages_MRP_opt_item_setup_Index> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Pages_MRP_opt_item_setup_Index> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Pages_MRP_opt_item_setup_Index>)PageContext?.ViewData;
        public Pages_MRP_opt_item_setup_Index Model => ViewData.Model;
    }
}
#pragma warning restore 1591
