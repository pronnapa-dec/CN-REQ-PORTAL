#pragma checksum "D:\Project\vsk-project\MIS-PORTAL-8099\CN\VSK-PORTAL\Pages\VSK-HR\hr-assessment-head\List.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "475bd7f937a2c25968d4bc5f47e4c250d2b99786"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.VSK_HR.hr_assessment_head.Pages_VSK_HR_hr_assessment_head_List), @"mvc.1.0.view", @"/Pages/VSK-HR/hr-assessment-head/List.cshtml")]
namespace MIS_PORTAL.Pages.VSK_HR.hr_assessment_head
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"475bd7f937a2c25968d4bc5f47e4c250d2b99786", @"/Pages/VSK-HR/hr-assessment-head/List.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_VSK_HR_hr_assessment_head_List : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("form-horizontals"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("autocomplete", new global::Microsoft.AspNetCore.Html.HtmlString("off"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            WriteLiteral(@"<div class=""col-12 col-sm-12 d-none"" id=""page_opt"">
    <div class=""card"">
        <div class=""card-header text-center"">
            <h1 class=""text-center mb-0 formheader"">ระดับหัวหน้างาน</h1>
        </div>
        <div class=""card-body"">
            ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "475bd7f937a2c25968d4bc5f47e4c250d2b997864853", async() => {
                WriteLiteral(@"
                <div class=""col-xl-12 col-md-12"">
                    <div class=""card"">
                        <div class=""card-body"">
                            <h4>&emsp;&emsp;<i class='fas fa-book-open'></i> เกณฑ์การให้คะแนน</h4>
                            <hr>
                            <div class=""main-criterion"">
                                <p style=""font-size:13px;""> 1-2 = ต่ำกว่าความคาดหวัง/เป้าหมายอย่างต่อเนื่อง&emsp; 3-4= ต่ำกว่าความคาดหวัง/เป้าหมาย&emsp;  5-6 = เป็นไปตามความคาดหวัง/เป้าหมาย&emsp;7-8 = ดีกว่าความคาดหวัง/เป้าหมาย&emsp; 9-10= ดีกว่าความคาดหวัง/เป้าหมายอย่างต่อเนื่อง</p>
                                <hr />
                            </div>
                            <div class=""card-portlet__body"">
                                <div class=""row"">
                                    <table class=""table table-head-bg-brand table-bordered table-hover"" id=""assessment-list"">
                                        <tr class=""text-center card-valign-middle"" style");
                WriteLiteral(@"=""vertical-align:middle;"">
                                            <th class=""text-center tx-16"" rowspan=""2"" valign=""middle"" style=""vertical-align:middle; width:40%;"">ปัจจัยการประเมินผลงาน</th>
                                            <th class=""text-center header_weight d-none"" rowspan=""2"" valign=""middle"" style=""vertical-align:middle; width:5%;"">น้ำหนัก</th>
                                            <th class=""text-center tx-16 quarter_score"" colspan=""6"" valign=""middle"" style=""vertical-align:middle; width:17%;"">คะแนนการประเมิน</th>
                                        </tr>
                                        <tr class=""text-center"">
                                            <th class=""text-center"" width=""6%""> คะแนน 1 - 10</th>
                                            <th class=""text-center"" width=""22%"">ความคิดเห็น</th>
                                        </tr>
                                    </table>
                                </div>
                             ");
                WriteLiteral(@"   <div class=""row"">
                                    <table class=""table table-sm table-head-bg-brand table-bordered"" id=""assessment-more"" style=""border:1px solid #000 !important"">
                                        <tr class=""text-center card-valign-middle"" style=""vertical-align:middle; background-color:#c2DFFc"">
                                            <th valign=""middle"" style=""vertical-align:middle; width:40%;"" width=""50%"">สิ่งที่ต้องแก้ไขและปรับปรุง</th>
                                            <th valign=""middle"" style=""vertical-align:middle; width:40%;"" width=""50%"">สิ่งที่ต้องเรียนรู้และพัฒนาเพิ่มเติม</th>
                                        </tr>
                                        <tr class=""text-center card-valign-middle"" style=""vertical-align:middle;"">
                                            <td><textarea class=""form-control"" id=""comment_1_1"" name=""comment_1_1"" style=""width:100%"" rows=""3"" required></textarea></td>
                                            <td><t");
                WriteLiteral(@"extarea class=""form-control"" id=""comment_1_2"" name=""comment_1_2"" style=""width:100%"" rows=""3"" required></textarea></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class=""mb-3 mb-xl-0"">
                                <button id=""btn-save_form"" type=""submit"" class=""btn-emp_create btn btn-primary btn-with-icon btn-block"" data-toggle=""modal"" data-target=""#modal-frm_data""><i class=""far fa-save""></i>บันทึก</button>
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
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");
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
