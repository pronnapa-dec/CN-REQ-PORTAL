#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\HR\hr-results\Form.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "729a42fee80454bdd2df6ab2910cfd01e1aad0f8"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.HR.hr_results.Pages_HR_hr_results_Form), @"mvc.1.0.view", @"/Pages/HR/hr-results/Form.cshtml")]
namespace MIS_PORTAL.Pages.HR.hr_results
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"729a42fee80454bdd2df6ab2910cfd01e1aad0f8", @"/Pages/HR/hr-results/Form.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_HR_hr_results_Form : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "729a42fee80454bdd2df6ab2910cfd01e1aad0f84149", async() => {
                WriteLiteral(@"
    <div class=""modal effect-flip-vertical"" id=""modal-frm_data"" data-keyboard=""false"" data-backdrop=""static"">
        <div class=""modal-dialog modal-dialog-scrollable modal-dialog-centered"" role=""document"" style=""max-width:900px"">
            <div class=""modal-content modal-content-demo"">
                <div class=""modal-header"">
                    <h6 class=""modal-title"">กาอนุมัติผลการประเมิน</h6><button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">
                    <div class=""kt-portlet__body"">

                        <div class=""form-group form-group-sm  row"">
                            <label class=""col-sm-2 col-form-label"">วันที่/เวลา ประเมิน : <br> Assess date/time : </label>
                            <div class=""col-sm-4"">
");
                WriteLiteral(@"                                <label style=""font-weight:bold;"" id=""data_pms"" class=""col-form-label tx-left tx-value""></label>
                            </div>
                            <label class=""col-sm-2 col-form-label"">รอบแบบประเมิน : <br> Quarter :</label>
                            <div class=""col-sm-4 input-group"">
");
                WriteLiteral(@"                                <label style=""font-weight:bold;"" id=""quarter_pms"" class=""col-form-label tx-left tx-value""></label>
                            </div>
                        </div>

                        <div class=""form-group form-group-sm  row"">
                            <label class=""col-sm-2 col-form-label"">ผู้ทำประเมิน : <br> Assessor :</label>
                            <div class=""col-sm-4"">
");
                WriteLiteral(@"                                <label style=""font-weight:bold;"" id=""assessor_pms"" class=""col-form-label tx-left tx-value""></label>
                            </div>
                            <label class=""col-sm-2 col-form-label"">ผู้ถูกประเมิน : <br> Assess :</label>
                            <div class=""col-sm-4 input-group"">
");
                WriteLiteral(@"                                <label style=""font-weight:bold;"" id=""assess_pms"" class=""col-form-label tx-left tx-value""></label>
                            </div>
                        </div>

                        <div class=""form-group form-group-sm  row"">
                            <label class=""col-sm-2 col-form-label"">คะแนน PMS: <br> Score PMS :</label>
                            <div class=""col-sm-2"">
");
                WriteLiteral(@"                                <label style=""font-weight:bold;"" id=""score_pms"" class=""col-form-label tx-left tx-value""></label>
                            </div>
                            <label class=""col-sm-2 col-form-label"">เปอร์เซ็น PMS: <br> Percentage PMS :</label>
                            <div class=""col-sm-2 input-group"">
");
                WriteLiteral(@"                                <label style=""font-weight:bold;"" id=""percentage_pms"" class=""col-form-label tx-left tx-value""></label>
                            </div>
                            <label class=""col-sm-2 col-form-label"">เวลา : <br> TIME :</label>
                            <div class=""col-sm-2 input-group"">
                                <label style=""font-weight:bold;"" id=""score_time"" class=""col-form-label tx-left tx-value""></label>
                            </div>
                        </div>
                        <div class=""form-group form-group-sm  row"">
                            <label class=""col-sm-2 col-form-label"">สถานะ :<br> Status :</label>
                            <div class=""d-flex flex-row justify-content-center mg-t-10 col-sm-10"">
                                <div class=""col"">
                                    <label class=""rdiobox""><input name=""rdio"" id=""update_status_0"" class=""update_status tx-primary"" type=""radio"" value=""0""> <span class=""tx-primar");
                WriteLiteral(@"y"">wait : รอ</span></label>
                                </div>
                                <div class=""col"">
                                    <label class=""rdiobox""><input name=""rdio"" id=""update_status_1"" class=""update_status tx-success"" type=""radio"" value=""1""> <span class=""tx-success"">success : สำเร็จ</span></label>
                                </div>
                                <div class=""col"">
                                    <label class=""rdiobox""><input name=""rdio"" id=""update_status_2"" class=""update_status tx-danger"" type=""radio"" value=""2""> <span class=""tx-danger"">cancel : ยกเลิก</span></label>
                                </div>
                            </div>
                        </div>

                        <div class=""form-group form-group-sm row "">
                            <label class=""col-sm-2 col-form-label"">หมายเหตุ : <br> Remarks :</label>
                            <div class=""col-sm-10"">
                                <textarea class=""form-");
                WriteLiteral("control \" id=\"remark_pms\" name=\"remark_pms\"></textarea>\r\n                            </div>\r\n\r\n                        </div>\r\n\r\n                    </div>\r\n\r\n");
                WriteLiteral(@"
                    <div class=""modal-footer"">
                        <button id=""btn-save_exit"" class=""btn ripple btn-primary btn-save_form"" data-action=""save_exit"" type=""submit"">Save</button>
                        <button class=""btn ripple btn-secondary"" data-dismiss=""modal"" type=""button"">Close</button>
                    </div>

                </div>

            </div>
        </div>
    </div>
    <!--End Scroll with content modal -->
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
            WriteLiteral("\r\n");
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
