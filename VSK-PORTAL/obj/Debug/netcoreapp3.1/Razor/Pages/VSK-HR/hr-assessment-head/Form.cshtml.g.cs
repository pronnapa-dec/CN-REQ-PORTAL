#pragma checksum "D:\Project\vsk-project\MIS-PORTAL-8099\CN-REQ-PORTAL\VSK-PORTAL\Pages\VSK-HR\hr-assessment-head\Form.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "682628a713492c96c34887695e4ae77536afd362"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.VSK_HR.hr_assessment_head.Pages_VSK_HR_hr_assessment_head_Form), @"mvc.1.0.view", @"/Pages/VSK-HR/hr-assessment-head/Form.cshtml")]
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
#line 1 "D:\Project\vsk-project\MIS-PORTAL-8099\CN-REQ-PORTAL\VSK-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"682628a713492c96c34887695e4ae77536afd362", @"/Pages/VSK-HR/hr-assessment-head/Form.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_VSK_HR_hr_assessment_head_Form : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("col-sm"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_detail"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_detail"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            WriteLiteral("<div class=\"col-12 col-sm-12\">\r\n    <div class=\"card\">\r\n        <div class=\"card-header\">\r\n            <h1 class=\"text-center\"><i class=\'fas fa-users\'></i> ??????????????????????????????????????????????????????????????????</h1>\r\n        </div>\r\n");
            WriteLiteral("        <div class=\"card-body pd-0\">\r\n            ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "682628a713492c96c34887695e4ae77536afd3625325", async() => {
                WriteLiteral(@"
                <div class=""row"">

                    <div class=""col-6"">
                        <div class=""card card-primary h-100"">
                            <div class=""card-body"">
                                <div class=""row"">

                                    <div class=""col-12 mb-3"">

                                        <div class=""text-center"">
                                            <img id=""emp_assessor_photo"" src=""../../assets/img/ecommerce/01.jpg"" alt=""img"" class=""img-fluid wd-100p wd-sm-150 rounded-20 employee_photo"">
                                        </div>

                                    </div>

                                    <div class=""col-12 align-self-center"">
                                        <div class=""form-group form-group-sm row"">
                                            <label class=""col-md-3 col-form-label"">????????????????????????????????????????????? :</label>
                                            <div class=""col-md-9 col-form-label"">
       ");
                WriteLiteral(@"                                         <span id=""emp_assessor"" name=""emp_assessor"" class=""tx-bold""></span>
                                            </div>
                                        </div>
                                        <div class=""form-group form-group-sm row"">
                                            <label class=""col-md-3 col-form-label in_emp_assess"">??????????????????????????????????????? :</label>
                                            <div class=""col-md-9 in_emp_assess"">
                                                <select type=""text"" class=""form-control bd-primary"" id=""emp_assess"" name=""emp_assess"">
                                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "682628a713492c96c34887695e4ae77536afd3627376", async() => {
                    WriteLiteral("-????????????????????????????????????????????????????????????-");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
                BeginWriteTagHelperAttribute();
                __tagHelperStringValueBuffer = EndWriteTagHelperAttribute();
                __tagHelperExecutionContext.AddHtmlAttribute("selected", Html.Raw(__tagHelperStringValueBuffer), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.Minimized);
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class=""col-6"">
                        <div class=""card card-info h-100"">
                            <div class=""card-body"">
                                <div class=""row"">

                                    <div class=""col-12 mb-3"">

                                        <div class=""text-center empdetail"">
                                            <img id=""h_employee_photo"" src=""../../assets/img/ecommerce/01.jpg"" alt=""img"" class=""img-fluid wd-100p wd-sm-150 rounded-20 employee_photo"">
                                        </div>

                                    </div>

                                    <div class=""c");
                WriteLiteral(@"ol-12 align-self-center"">


                                        <div class=""alert justify-content-center chkdup text-center text-dark d-none"" role=""alert"">
                                            <span class=""alert-inner--icon""><i class=""fe fe-info""></i></span>
                                            <span class=""alert-inner--text alert-text""><strong>!</strong>&nbsp;?????????????????????????????????&nbsp;</span><span class=""alert-inner--text alert-data"" id=""alert""></span>
                                        </div>

                                        <div class=""form-group form-group-sm row empdetail"">
                                            <label class=""col-md-2 col-form-label"">????????????????????????????????? :</label>
                                            <div class=""col-md-4 col-form-label"">
                                                <span id=""h_employee_code"" name=""h_employee_code"" class=""tx-bold""></span>
                                            </div>
                                           ");
                WriteLiteral(@" <label class=""col-md-2 col-form-label"">?????????????????????????????? :</label>
                                            <div class=""col-md-4 col-form-label"">
                                                <span id=""h_employee_assess"" name=""h_employee_assess"" class=""tx-bold""></span>
                                            </div>
                                        </div>

                                        <div class=""form-group form-group-sm row empdetail"">

                                            <label class=""col-md-2 col-form-label"">???????????? :</label>
                                            <div class=""col-md-4 col-form-label"">
                                                <span id=""h_employee_sec"" name=""h_employee_sec"" class=""tx-bold""></span>
                                            </div>

                                            <label class=""col-md-2 col-form-label"">???????????? :</label>
                                            <div class=""col-md-4 col-form-label"">
               ");
                WriteLiteral(@"                                 <span id=""h_employee_dept"" name=""h_employee_dept"" class=""tx-bold""></span>
                                            </div>

                                        </div>

                                        <div class=""form-group form-group-sm row empdetail"">

                                            <label class=""col-md-2 col-form-label"">?????????????????????????????? :</label>
                                            <div class=""col-md-4 col-form-label"">
                                                <span id=""h_employee_pos"" name=""h_employee_pos"" class=""tx-bold""></span>
                                            </div>

                                            <label class=""col-md-2 col-form-label"">?????????????????????????????????????????? :</label>
                                            <div class=""col-md-4 col-form-label"">
                                                <span id=""h_employee_job_startdate"" name=""h_employee_job_startdate"" class=""tx-bold""></span>
                    ");
                WriteLiteral(@"                        </div>

                                        </div>

                                        <div class=""form-group form-group-sm row empdetail"">

                                            <label class=""col-md-2 col-form-label"">????????????????????? :</label>
                                            <div class=""col-md-4 col-form-label"">
                                                <span id=""h_job_old"" name=""h_job_old"" class=""tx-bold""></span>
                                            </div>

                                            <label class=""col-md-2 col-form-label"">?????????????????????????????? :</label>
                                            <div class=""col-md-4 col-form-label"">
                                                <span id=""h_data_quarter"" name=""h_data_quarter"" class=""tx-bold""></span>
                                            </div>
                                        </div>

                                    </div>
                                </div>");
                WriteLiteral("\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n\r\n            ");
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
            WriteLiteral(@"

            <div class=""table-responsive mg-t-20 "">
                <table id=""tbl-list"" class=""table table-bordered table-striped table-hover mg-b-0 text-md-nowrap d-none"">
                    <thead>
                        <tr>
                            <th class=""d-none"">id</th>
                            <th><div style=""text-align:center;"">?????????<br><span style=""font-size: 10px; font-weight: bold; color: black;"">???????????????</span></div></th>
                            <th><div style=""text-align:center;""");
            BeginWriteAttribute("class", " class=\"", 8245, "\"", 8253, 0);
            EndWriteAttribute();
            WriteLiteral(">?????????<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">????????????</span></div></th>\r\n                            <th><div style=\"text-align:center;\"");
            BeginWriteAttribute("class", " class=\"", 8413, "\"", 8421, 0);
            EndWriteAttribute();
            WriteLiteral(">??????????????????<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">???????????????</span></div></th>\r\n                            <th><div style=\"text-align:center;\"");
            BeginWriteAttribute("class", " class=\"", 8585, "\"", 8593, 0);
            EndWriteAttribute();
            WriteLiteral(">??????????????????<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">????????????</span></div></th>\r\n                            <th><div style=\"text-align:center;\"");
            BeginWriteAttribute("class", " class=\"", 8756, "\"", 8764, 0);
            EndWriteAttribute();
            WriteLiteral(">??????????????????<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">????????????</span></div></th>\r\n                            <th><div style=\"text-align:center;\"");
            BeginWriteAttribute("class", " class=\"", 8927, "\"", 8935, 0);
            EndWriteAttribute();
            WriteLiteral(">???????????????<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">????????????</span></div></th>\r\n                            <th><div style=\"text-align:center;\"");
            BeginWriteAttribute("class", " class=\"", 9097, "\"", 9105, 0);
            EndWriteAttribute();
            WriteLiteral(">??????????????????<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">????????????</span></div></th>\r\n                            <th><div style=\"text-align:center;\"");
            BeginWriteAttribute("class", " class=\"", 9268, "\"", 9276, 0);
            EndWriteAttribute();
            WriteLiteral(">???????????????<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">????????????</span></div></th>\r\n                            <th><div style=\"text-align:center;\"");
            BeginWriteAttribute("class", " class=\"", 9438, "\"", 9446, 0);
            EndWriteAttribute();
            WriteLiteral(">????????????????????????????????????<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">????????????</span></div></th>\r\n                            <th><div style=\"text-align:center;\"");
            BeginWriteAttribute("class", " class=\"", 9615, "\"", 9623, 0);
            EndWriteAttribute();
            WriteLiteral(">?????????????????????<br><span style=\"font-size: 10px; font-weight: bold; color: black;\">?????????????????????</span></div></th>\r\n                            <th><div style=\"text-align:center;\"");
            BeginWriteAttribute("class", " class=\"", 9790, "\"", 9798, 0);
            EndWriteAttribute();
            WriteLiteral(">?????????????????????<br><span style=\"font-size: 10px; font-weight: bold; color: black;\"></span> </div></th>\r\n                            <th><div style=\"text-align:center;\"");
            BeginWriteAttribute("class", " class=\"", 9959, "\"", 9967, 0);
            EndWriteAttribute();
            WriteLiteral(">??????????????????????????????<br><span style=\"font-size: 10px; font-weight: bold; color: black;\"></span> </div></th>\r\n                            <th><div style=\"text-align:center;\"");
            BeginWriteAttribute("class", " class=\"", 10131, "\"", 10139, 0);
            EndWriteAttribute();
            WriteLiteral(@">??????????????????????????????<br><span style=""font-size: 10px; font-weight: bold; color: black;""></span> </div></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
");
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
