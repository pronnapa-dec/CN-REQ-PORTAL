#pragma checksum "D:\Project\vsk-project\MIS-PORTAL-8099\CN\VSK-PORTAL\Pages\VSK-HR\hr-assessment-results-manage\Assessment_Form.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "fe62a4ae0c85060c950173a97f68b0c099e63d27"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.VSK_HR.hr_assessment_results_manage.Pages_VSK_HR_hr_assessment_results_manage_Assessment_Form), @"mvc.1.0.view", @"/Pages/VSK-HR/hr-assessment-results-manage/Assessment_Form.cshtml")]
namespace MIS_PORTAL.Pages.VSK_HR.hr_assessment_results_manage
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"fe62a4ae0c85060c950173a97f68b0c099e63d27", @"/Pages/VSK-HR/hr-assessment-results-manage/Assessment_Form.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_VSK_HR_hr_assessment_results_manage_Assessment_Form : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_assess"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_assess"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "fe62a4ae0c85060c950173a97f68b0c099e63d274323", async() => {
                WriteLiteral(@"
    <div class=""modal effect-flip-vertical"" id=""modal-frm_assess"" data-keyboard=""false"" data-backdrop=""static"">
        <div class=""modal-dialog modal-dialog-scrollable modal-dialog-centered"" role=""document"" style=""max-width:90%"">
            <div class=""modal-content modal-content-demo"">
                <div class=""modal-header"">
                    <h6 class=""modal-title"">การอนุมัติผลการประเมิน</h6><span id=""title_assess_pms"" class=""modal-title ml-1 tx-primary""></span>
                    <button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">
                    <div class=""card"">
                        <div class=""card-body"">
                            <h4 class=""tx-center formheader"">&emsp;&emsp;<i class='fas fa-book-open'></i></h4>
                            <hr>
                            <div class=""main-criterion"">
                                <div");
                WriteLiteral(@" class=""form-group form-group-sm row"">
                                    <label class=""col-md-2 col-form-label"">ผู้ทำการประเมิน :</label>
                                    <div class=""col-md-4 col-form-label"">
                                        <span id=""emp_assessor"" name=""emp_assessor"" class=""tx-bold""></span>
                                    </div>
                                    <label class=""col-md-2 col-form-label in_emp_assess"">ผู้ถูกประเมิน :</label>
                                    <div class=""col-md-4 col-form-label in_emp_assess"">
                                        <span id=""emp_assess"" name=""emp_assess"" class=""tx-bold""></span>
                                    </div>
                                </div>
                                <div class=""form-group form-group-sm row empdetail"" id=""empdetail"">
                                    <div class=""border-top my-3""></div>

                                    <label class=""col-md-1 col-form-label"">รหัสพนักงาน");
                WriteLiteral(@" :</label>
                                    <div class=""col-md-2 col-form-label"">
                                        <span id=""h_employee_code"" name=""h_employee_code"" class=""tx-bold tx-detail""></span>
                                    </div>
                                    <label class=""col-md-1 col-form-label"">ฝ่าย :</label>
                                    <div class=""col-md-2 col-form-label"">
                                        <span id=""h_employee_sec"" name=""h_employee_sec"" class=""tx-bold tx-detail""></span>
                                    </div>

                                    <label class=""col-md-1 col-form-label"">แผนก :</label>
                                    <div class=""col-md-2 col-form-label"">
                                        <span id=""h_employee_dept"" name=""h_employee_dept"" class=""tx-bold tx-detail""></span>
                                    </div>
                                    <label class=""col-md-1 col-form-label"">ตำแหน่งงาน :</label>
 ");
                WriteLiteral(@"                                   <div class=""col-md-2 col-form-label"">
                                        <span id=""h_employee_pos"" name=""h_employee_pos"" class=""tx-bold tx-detail""></span>
                                    </div>
                                </div>
                                <div class=""form-group form-group-sm row empdetail"">
                                    <label class=""col-md-1 col-form-label"">วันที่เริ่มงาน :</label>
                                    <div class=""col-md-2 col-form-label"">
                                        <span id=""h_employee_job_startdate"" name=""h_employee_job_startdate"" class=""tx-bold tx-detail""></span>
                                    </div>
                                    <label class=""col-md-1 col-form-label"">อายุงาน :</label>
                                    <div class=""col-md-2 col-form-label"">
                                        <span id=""h_job_old"" name=""h_job_old"" class=""tx-bold tx-detail""></span>
            ");
                WriteLiteral(@"                        </div>
                                    <label class=""col-md-1 col-form-label"">รอบประเมิน :</label>
                                    <div class=""col-md-2 col-form-label"">
                                        <span id=""h_data_quarter"" name=""h_data_quarter"" class=""tx-bold tx-detail""></span>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div class=""table-responsive mg-t-5"">
                                <table id=""tbl-time"" class=""table table-bordered table-striped table-hover mg-b-0 text-md-nowrap d-none"">
                                    <thead>
                                        <tr>
                                            <th class=""d-none"">id</th>
                                            <th><div style=""text-align:center;"">สาย<br><span style=""font-size: 10px; font-weight: bold; color: black;"">ครั้ง</span></div");
                WriteLiteral("></th>\r\n                                            <th><div style=\"text-align:center;\"");
                BeginWriteAttribute("class", " class=\"", 5266, "\"", 5274, 0);
                EndWriteAttribute();
                WriteLiteral(">สาย<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">เวลา</span></div></th>\r\n                                            <th><div style=\"text-align:center;\"");
                BeginWriteAttribute("class", " class=\"", 5450, "\"", 5458, 0);
                EndWriteAttribute();
                WriteLiteral(">ขาดงาน<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">ครั้ง</span></div></th>\r\n                                            <th><div style=\"text-align:center;\"");
                BeginWriteAttribute("class", " class=\"", 5638, "\"", 5646, 0);
                EndWriteAttribute();
                WriteLiteral(">ขาดงาน<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">เวลา</span></div></th>\r\n                                            <th><div style=\"text-align:center;\"");
                BeginWriteAttribute("class", " class=\"", 5825, "\"", 5833, 0);
                EndWriteAttribute();
                WriteLiteral(">ลาป่วย<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">เวลา</span></div></th>\r\n                                            <th><div style=\"text-align:center;\"");
                BeginWriteAttribute("class", " class=\"", 6012, "\"", 6020, 0);
                EndWriteAttribute();
                WriteLiteral(">ลากิจ<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">เวลา</span></div></th>\r\n                                            <th><div style=\"text-align:center;\"");
                BeginWriteAttribute("class", " class=\"", 6198, "\"", 6206, 0);
                EndWriteAttribute();
                WriteLiteral(">ลาคลอด<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">เวลา</span></div></th>\r\n                                            <th><div style=\"text-align:center;\"");
                BeginWriteAttribute("class", " class=\"", 6385, "\"", 6393, 0);
                EndWriteAttribute();
                WriteLiteral(">ลาบวช<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">เวลา</span></div></th>\r\n                                            <th><div style=\"text-align:center;\"");
                BeginWriteAttribute("class", " class=\"", 6571, "\"", 6579, 0);
                EndWriteAttribute();
                WriteLiteral(">ลาหักค่าจ้าง<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">เวลา</span></div></th>\r\n                                            <th><div style=\"text-align:center;\"");
                BeginWriteAttribute("class", " class=\"", 6764, "\"", 6772, 0);
                EndWriteAttribute();
                WriteLiteral(">ลางานศพ<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">งานแต่ง</span></div></th>\r\n                                            <th><div style=\"text-align:center;\"");
                BeginWriteAttribute("class", " class=\"", 6955, "\"", 6963, 0);
                EndWriteAttribute();
                WriteLiteral(">ใบเตือน<br><span style=\"font-size: 10px; font-weight: bold; color: black;\"></span> </div></th>\r\n                                            <th><div style=\"text-align:center;\"");
                BeginWriteAttribute("class", " class=\"", 7140, "\"", 7148, 0);
                EndWriteAttribute();
                WriteLiteral(">ใบภาคทัณฑ์<br><span style=\"font-size: 10px; font-weight: bold; color: black;\"></span> </div></th>\r\n                                            <th><div style=\"text-align:center;\"");
                BeginWriteAttribute("class", " class=\"", 7328, "\"", 7336, 0);
                EndWriteAttribute();
                WriteLiteral(@">รอบประเมิน<br><span style=""font-size: 10px; font-weight: bold; color: black;""></span> </div></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div class=""table-responsive mg-t-10"">
                                <table class=""table table-head-bg-brand table-bordered table-hover"" id=""assessment-list"">
                                    <tr class=""text-center card-valign-middle"" style=""vertical-align:middle;"">
                                        <th class=""text-center"" rowspan=""2"" valign=""middle"" style=""vertical-align:middle; width:40%;"">ปัจจัยการประเมินผลงาน</th>
                                        <th class=""text-center header_weight"" rowspan=""2"" valign=""middle"" style=""vertical-align:middle; width:5%;"">น้ำหนัก</th>
                                    ");
                WriteLiteral(@"    <th class=""text-center quarter_score"" colspan=""6"" valign=""middle"" style=""vertical-align:middle; width:17%;"">คะแนนการประเมิน</th>
                                    </tr>
                                    <tr class=""text-center"">
                                        <th class=""text-center"" width=""6%""> คะแนน 1 - 10</th>
                                        <th class=""text-center"" width=""22%"">ความคิดเห็น</th>
                                    </tr>
                                </table>
                            </div>
                            <div class=""table-responsive"">
                                <table class=""table table-sm table-head-bg-brand table-bordered"" id=""assessment-more"" style=""border:1px solid #000 !important"">
                                    <tr class=""text-center card-valign-middle"" style=""vertical-align:middle; background-color:#c2DFFc"">
                                        <th valign=""middle"" style=""vertical-align:middle; width:40%;"" width=""50%"">ควา");
                WriteLiteral(@"มสำเร็จและจุดเด่น (อย่างน้อย 3 ข้อ)</th>
                                        <th valign=""middle"" style=""vertical-align:middle; width:40%;"" width=""50%"">สิ่งที่ควรปรับปรุงและจุดอ่อน (อย่างน้อย 3 ข้อ)</th>
                                    </tr>
                                    <tr class=""text-center card-valign-middle"" style=""vertical-align:middle;"">
                                        <td><textarea class=""form-control"" id=""comment_1_1"" name=""comment_1_1"" style=""width:100%"" required></textarea></td>
                                        <td><textarea class=""form-control"" id=""comment_1_2"" name=""comment_1_2"" style=""width:100%"" required></textarea></td>
                                    </tr>
                                </table>
                            </div>
                            <div class=""mb-3 mb-xl-0"">
                                <button id=""btn-save_form"" type=""submit"" class=""btn-emp_create btn btn-primary btn-with-icon btn-block"" data-toggle=""modal"" data-target=""");
                WriteLiteral("#modal-frm_data\"><i class=\"far fa-save\"></i>บันทึก</button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n");
                WriteLiteral("                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
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