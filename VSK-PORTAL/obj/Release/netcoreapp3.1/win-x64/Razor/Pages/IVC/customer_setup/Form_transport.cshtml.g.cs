#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\IVC\customer_setup\Form_transport.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "6f7132c86b8975d4e0aac8a8794aa05ba67d90f8"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.IVC.customer_setup.Pages_IVC_customer_setup_Form_transport), @"mvc.1.0.view", @"/Pages/IVC/customer_setup/Form_transport.cshtml")]
namespace MIS_PORTAL.Pages.IVC.customer_setup
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"6f7132c86b8975d4e0aac8a8794aa05ba67d90f8", @"/Pages/IVC/customer_setup/Form_transport.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_IVC_customer_setup_Form_transport : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("form-horizontal"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_trans"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_trans"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("autocomplete", new global::Microsoft.AspNetCore.Html.HtmlString("off"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "6f7132c86b8975d4e0aac8a8794aa05ba67d90f84944", async() => {
                WriteLiteral("\r\n    <div class=\"breadcrumb-header justify-content-between\">\r\n        <div class=\"card-header pb-0\">\r\n            <h5 class=\"card-title mb-0 pb-0\">ที่อยู่ขนส่ง</h5>\r\n        </div>\r\n        <div class=\"d-flex my-xl-auto right-content\">\r\n");
                WriteLiteral(@"        </div>
    </div>
    <div class=""border-top my-3""></div>

    <div class=""kt-portlet__body"">
        <div class=""form-group form-group-sm row d-flex justify-content-center"">
            <label class=""col-md-1 col-form-label"" align=""right"">ชื่อขนส่ง</label>
            <div class=""col-md-6"">
                <select class=""form-control  select2 tran_name"" id=""tran_name"" name=""tran_name"" style=""width: 100%;"" required data-parsley-error-message=""กรุณาเลือกชื่อขนส่ง"" >
                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "6f7132c86b8975d4e0aac8a8794aa05ba67d90f86021", async() => {
                    WriteLiteral("Please select..");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                </select>
            </div>
        </div>
        <div class=""form-group form-group-sm row d-flex justify-content-center"">
            <label class=""col-form-label col-sm-1"" align=""right"">เรื่มต้น</label>
            <div class=""col-sm-2"">
                <div class=""main-toggle-group-demo"" style=""padding: 0.375rem 0;"">
                    <div class=""main-toggle main-toggle-success default-switches-trp"">
                        <span></span>
                    </div>
                </div>
            </div>
            <label class=""col-form-label col-1"" align=""right"">ชำระค่าขนส่ง</label>
            <div class=""col-form-label col-1"">
                <label class=""rdiobox""><input type=""radio"" id=""lov_deliverycost_code_1"" class=""lov_deliverycost_code col-form-label"" name=""rdio"" value=""1""> <span class=""tx-success"">ต้นทาง</span></label>
            </div>
            <div class=""col-form-label col-1"">
                <label class=""rdiobox""><input type=""radio"" id=""lov_deliv");
                WriteLiteral("erycost_code_2\" class=\"lov_deliverycost_code col-form-label\" name=\"rdio\" value=\"0\"");
                BeginWriteAttribute("checked", " checked=\"", 2040, "\"", 2050, 0);
                EndWriteAttribute();
                WriteLiteral(@"> <span class=""tx-danger"">ปลายทาง</span></label>
            </div>
            <div class=""col-1""></div>
        </div>
    </div>

    <!-- 2 -->
    <div class=""kt-portlet__body"">
        <div class=""form-group form-group-sm row d-flex justify-content-center"">
            <div class=""col-1"">
                <div class=""input-group btn-create-trp"">
                    <button id=""btn-item-trp-create"" type=""submit"" class=""btn btn-success btn-with-icon btn-block"">ADD +</button>
                </div><!-- input-group -->
                <div class=""input-group btn-edit-trp hide"">
                    <button id=""btn-edit-trp"" type=""submit"" class=""btn btn-success btn-with-icon btn-block"">Edit</button>
                </div><!-- input-group -->

            </div>
            <div class=""col-1"">
                <div class=""input-group"">
                    <button id=""btn-item-trp-cancle"" type=""reset"" class=""btn btn-light btn-with-icon btn-block"">Cancel</button>
                </div><!-- inp");
                WriteLiteral("ut-group -->\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n\r\n<div class=\"border-top my-3\"></div>\r\n<div class=\"table-responsive mg-t-20\">\r\n    <table id=\"tbl-trp-list\" class=\"table table-bordered table-striped table-hover mg-b-0 text-md-nowrap\"></table>\r\n</div>");
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
