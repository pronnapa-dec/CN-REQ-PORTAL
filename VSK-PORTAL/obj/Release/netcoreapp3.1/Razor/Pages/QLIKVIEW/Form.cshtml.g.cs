#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\QLIKVIEW\Form.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "0ffb21c3368525287508d404a696e84bcf214255"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.QLIKVIEW.Pages_QLIKVIEW_Form), @"mvc.1.0.view", @"/Pages/QLIKVIEW/Form.cshtml")]
namespace MIS_PORTAL.Pages.QLIKVIEW
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"0ffb21c3368525287508d404a696e84bcf214255", @"/Pages/QLIKVIEW/Form.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_QLIKVIEW_Form : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<!-- Scroll with content modal -->\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "0ffb21c3368525287508d404a696e84bcf2142554536", async() => {
                WriteLiteral(@"
    <div class=""modal effect-flip-vertical"" id=""modal-frm_data"" data-keyboard=""false"" data-backdrop=""static"">
        <div class=""modal-dialog modal-dialog-scrollable modal-dialog-centered"" role=""document"">
            <div class=""modal-content modal-content-demo"">
                <div class=""modal-header"">
                    <h6 class=""modal-title"">");
#nullable restore
#line 7 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\QLIKVIEW\Form.cshtml"
                                       Write(ViewData["Content-Title-Page"]);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" Form</h6><button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">

                    <div class=""form-group row"">
                        <label for=""site_code"" class=""col-sm-3 col-form-label"">Site Code <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-9"">
                            <select class=""form-control select2"" id=""site_code"" name=""site_code"" data-width=""100%"" required>
                                ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "0ffb21c3368525287508d404a696e84bcf2142556049", async() => {
                    WriteLiteral("--- Select Site ---");
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

                    <div class=""form-group row"">
                        <label class=""col-sm-3 col-form-label pt-0"">Days <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-9"">
                            <div class=""form-check form-check-inline"">
                                <input class=""form-check-input schedule_all"" type=""checkbox"" name=""schedule_all"" id=""schedule_all"" value=""Y"">
                                <label class=""form-check-label"" for=""schedule_all"">Every</label>
                            </div>
                            <div class=""form-check form-check-inline"">
                                <input class=""form-check-input schedule_day"" type=""checkbox"" name=""schedule_mon"" id=""schedule_mon"" value=""Y"">
                                <label class=""form-check-label"" for=""schedule_mon"" style=""color:sandybrown"">MON</label>
                       ");
                WriteLiteral(@"     </div>
                            <div class=""form-check form-check-inline"">
                                <input class=""form-check-input schedule_day"" type=""checkbox"" name=""schedule_tue"" id=""schedule_tue"" value=""Y"">
                                <label class=""form-check-label"" for=""schedule_tue"" style=""color:hotpink"">TUE</label>
                            </div>
                            <div class=""form-check form-check-inline"">
                                <input class=""form-check-input schedule_day"" type=""checkbox"" name=""schedule_wed"" id=""schedule_wed"" value=""Y"">
                                <label class=""form-check-label"" for=""schedule_wed"" style=""color:green"">WED</label>
                            </div>
                            <div class=""form-check form-check-inline"">
                                <input class=""form-check-input schedule_day"" type=""checkbox"" name=""schedule_thu"" id=""schedule_thu"" value=""Y"">
                                <label class=""form-check-lab");
                WriteLiteral(@"el"" for=""schedule_thu"" style=""color:darkorange"">THU</label>
                            </div>
                            <div class=""form-check form-check-inline"">
                                <input class=""form-check-input schedule_day"" type=""checkbox"" name=""schedule_fri"" id=""schedule_fri"" value=""Y"">
                                <label class=""form-check-label"" for=""schedule_fri"" style=""color:cornflowerblue"">FRI</label>
                            </div>
                            <div class=""form-check form-check-inline"">
                                <input class=""form-check-input schedule_day"" type=""checkbox"" name=""schedule_sat"" id=""schedule_sat"" value=""Y"">
                                <label class=""form-check-label"" for=""schedule_sat"" style=""color:purple"">SAT</label>
                            </div>
                            <div class=""form-check form-check-inline"">
                                <input class=""form-check-input schedule_day"" type=""checkbox"" name=""schedule_sun");
                WriteLiteral(@""" id=""schedule_sun"" value=""Y"">
                                <label class=""form-check-label"" for=""schedule_sun"" style=""color:red"">SUN</label>
                            </div>
                        </div>
                    </div>

                    <div class=""form-group row"">
                        <label for=""formula_func"" class=""col-sm-3 col-form-label"">Remark <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-9"">
                            <textarea class=""form-control"" id=""schedule_note"" name=""schedule_note"" rows=""5"" required></textarea>
                        </div>
                    </div>

                    <div class=""form-group row"">
                        <label class=""col-sm-3 col-form-label pt-0"">Active Status <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-9"">
                            <div class=""form-check form-check-inline"">
                                <input class=""form-check-input re");
                WriteLiteral(@"cord_status"" type=""radio"" name=""recode_status"" id=""recode_status_yes"" value=""Y"">
                                <label class=""form-check-label tx-success"" for=""recode_status_yes"">
                                    Enabled
                                </label>
                            </div>
                            <div class=""form-check form-check-inline"">
                                <input class=""form-check-input record_status"" type=""radio"" name=""recode_status"" id=""recode_status_no"" value=""N"">
                                <label class=""form-check-label tx-danger"" for=""recode_status_no"">
                                    Disabled
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class=""modal-footer"">
                        <button id=""btn-save_exit"" class=""btn ripple btn-primary btn-save_form"" data-action=""save_exit"" type=""submit"">Save</button>
                  ");
                WriteLiteral(@"      <button id=""btn-save_new"" class=""btn ripple btn-success btn-save_form"" data-action=""save_new"" type=""submit"">Save & New</button>
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
