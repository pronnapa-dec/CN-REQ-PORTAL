#pragma checksum "D:\Project\vsk-project\MIS-PORTAL-8099\CN-REQ-PORTAL\VSK-PORTAL\Pages\VSK-CA\opt-accrued_bill-job\Modal_Customer.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "bb1f145f8cd21791501ee439ade94c2ca005d6d2"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.VSK_CA.opt_accrued_bill_job.Pages_VSK_CA_opt_accrued_bill_job_Modal_Customer), @"mvc.1.0.view", @"/Pages/VSK-CA/opt-accrued_bill-job/Modal_Customer.cshtml")]
namespace MIS_PORTAL.Pages.VSK_CA.opt_accrued_bill_job
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"bb1f145f8cd21791501ee439ade94c2ca005d6d2", @"/Pages/VSK-CA/opt-accrued_bill-job/Modal_Customer.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_VSK_CA_opt_accrued_bill_job_Modal_Customer : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("label", new global::Microsoft.AspNetCore.Html.HtmlString("--- เลือกลูกค้า ---"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""modal effect-flip-vertical"" id=""modal-frm_cus"" data-keyboard=""false"" data-backdrop=""static"">
    <div class=""modal-dialog modal-dialog-scrollable modal-dialog-centered"" role=""document"" style=""max-width:90%"">
        <div class=""modal-content modal-content-demo"">
            <div class=""modal-header"">
                <h6 class=""modal-title"">รายการบิลค้างรับลูกค้า</h6>
                <span class=""tx-15 tx-primary pd-t-3 mg-l-10 time-today""></span>
                <button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
            </div>
            <div class=""modal-body"">
                <div class=""row"">
                    <div class=""col-sm-12"">
                        <div class=""form-group form-group-sm row"">
                            <label for=""pck_number"" class=""col-md-1 col-form-label tx-left"">จำนวนเงิน :</label>
                            <div class=""col-md-3"">
                                <div class");
            WriteLiteral(@"=""input-group mb-3"">
                                    <div class=""input-group-prepend"">
                                        <span class=""input-group-text"">$</span>
                                    </div>
                                    <input aria-label=""Amount (to the nearest dollar)"" class=""form-control tx-right"" type=""text"" id=""arrears-amount"" disabled>
                                    <div class=""input-group-append"">
                                        <span class=""input-group-text"">บาท</span>
                                    </div>
                                </div><!-- เงิน -->
                            </div>
                            <label class=""col-md-1 col-form-label tx-right"">ลูกค้า : </label>
                            <div class=""col-md-3"">
                                <select class=""form-control select2"" id=""arrears-customer"">
                                    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bb1f145f8cd21791501ee439ade94c2ca005d6d25547", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
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
                            <div class=""col-md-2"">
                                <div class=""input-group"">
                                    <button type=""button"" class=""btn btn-dark"" id=""btn-arrears""><i class=""las la-search-location mr-1""></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""clearfix""></div>
                </div>
                <div class=""row row-sm"">
                    <div class=""col-lg-12"">
                        <table id=""tbl-customer"" class=""table table-bordered table-striped table-hover mg-b-0 text-md-nowrap"" style=""width:100%"">
                        </table>
                    </div>
                </div>
            </div>
            <div class=""modal-footer"">
                <button class=""btn ripple btn-secondary"" data-dismiss=""modal"" type=""button"">");
            WriteLiteral("Close</button>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n");
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
