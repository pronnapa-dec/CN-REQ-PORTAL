#pragma checksum "D:\Project\vsk-project\MIS-PORTAL-8099\CN-REQ-PORTAL\VSK-PORTAL\Pages\VSK-CA\opt-accrued_bill-job\Modal_Bill_Receive_Verify.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "16d131a1ae4c687f54dc80b5e7d24c667a4a6f98"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.VSK_CA.opt_accrued_bill_job.Pages_VSK_CA_opt_accrued_bill_job_Modal_Bill_Receive_Verify), @"mvc.1.0.view", @"/Pages/VSK-CA/opt-accrued_bill-job/Modal_Bill_Receive_Verify.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"16d131a1ae4c687f54dc80b5e7d24c667a4a6f98", @"/Pages/VSK-CA/opt-accrued_bill-job/Modal_Bill_Receive_Verify.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_VSK_CA_opt_accrued_bill_job_Modal_Bill_Receive_Verify : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_bill_receive_verify"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_bill_receive_verify"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("autocomplete", new global::Microsoft.AspNetCore.Html.HtmlString("off"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<!-- Scroll with content modal -->\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "16d131a1ae4c687f54dc80b5e7d24c667a4a6f984434", async() => {
                WriteLiteral(@"
    <div class=""modal effect-flip-vertical"" id=""modal-bill_receive_verify"" data-keyboard=""false"" data-backdrop=""static"">
        <div class=""modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered"" role=""document"">
            <div class=""modal-content modal-content-demo"" style=""width: 100%"">
                <div class=""modal-header"">
                    <h6 class=""modal-title"">ตรวจสอบข้อมูล/บิลรับเงิน</h6>
                    <span class=""tx-15 tx-primary pd-t-3 mg-l-10 time-today""></span>
                    <button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">
                    <div class=""row row-sm"">
                        <div class=""col-sm-3"">
                            <div class=""card "">
                                <div class=""card-body"">
                                    <div class=""counter-status d-flex md-mb-0"">
               ");
                WriteLiteral(@"                         <div class=""counter-icon bg-primary-transparent"">
                                            <i class=""icon-layers text-primary""></i>
                                        </div>
                                        <div class=""ml-auto"">
                                            <h5 class=""tx-13"">บิลทั้งหมด</h5>
                                            <h2 class=""mb-0 tx-22 mb-1 mt-1 parameter_1"">0</h2>
                                            <p class=""text-muted mb-0 tx-11""><i class=""si si-arrow-up-circle text-success mr-1""></i>รายการ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-sm-3"">
                            <div class=""card "">
                                <div class=""card-body"">
                                    <div class=""counter-status d-flex md-mb-0");
                WriteLiteral(@""">
                                        <div class=""counter-icon bg-danger-transparent"">
                                            <i class=""las la-trash text-danger""></i>
                                        </div>
                                        <div class=""ml-auto"">
                                            <h5 class=""tx-13"">นำออก</h5>
                                            <h2 class=""mb-0 tx-22 mb-1 mt-1 parameter_2"">0</h2> 
                                            <p class=""text-muted mb-0 tx-11""><i class=""si si-arrow-up-circle text-success mr-1""></i>รายการ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-sm-3"">
                            <div class=""card "">
                                <div class=""card-body"">
                                    <div class=""counter-status ");
                WriteLiteral(@"d-flex md-mb-0"">
                                        <div class=""counter-icon bg-success-transparent"">
                                            <i class=""las la-plus-circle text-success""></i>
                                        </div>
                                        <div class=""ml-auto"">
                                            <h5 class=""tx-13"">นำเข้าใหม่</h5>
                                            <h2 class=""mb-0 tx-22 mb-1 mt-1 parameter_3"">0</h2>
                                            <p class=""text-muted mb-0 tx-11""><i class=""si si-arrow-up-circle text-success mr-1""></i>รายการ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-sm-3"">
                            <div class=""card "">
                                <div class=""card-body"">
                                    <");
                WriteLiteral(@"div class=""counter-status d-flex md-mb-0"">
                                        <div class=""counter-icon bg-indigo-transparent"">
                                            <i class=""las la-edit tx-indigo ""></i>
                                        </div>
                                        <div class=""ml-auto"">
                                            <h5 class=""tx-13"">แก้ไข</h5>
                                            <h2 class=""mb-0 tx-22 mb-1 mt-1 parameter_4"">0</h2>
                                            <p class=""text-muted mb-0 tx-11""><i class=""si si-arrow-up-circle text-success mr-1""></i>รายการ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""row row-sm"">
                        <div class=""col-lg-12"">
                            <table id=""tbl-bill_receive_v");
                WriteLiteral(@"erify"" class=""table table-bordered table-striped table-hover mg-b-0 text-md-nowrap"" style=""width:100%"">
                            </table>
                        </div>
                    </div>
                </div>
                <div class=""modal-footer"">
                    <button id=""btn-bill_upload"" class=""btn ripple btn-indigo"" data-action=""save_exit"" type=""button"" disabled>อัพโหลด</button>
                    <button class=""btn ripple btn-secondary"" data-dismiss=""modal"" type=""button"">ปิด</button>
                </div>
            </div>
        </div>
    </div>
");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n<!--End Scroll with content modal -->\r\n");
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
