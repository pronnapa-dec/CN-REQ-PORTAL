#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\MRP\mas_site\Form.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "1e56902c88fe060837c1ba2bb71f63c9b328a67d"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.MRP.mas_site.Pages_MRP_mas_site_Form), @"mvc.1.0.view", @"/Pages/MRP/mas_site/Form.cshtml")]
namespace MIS_PORTAL.Pages.MRP.mas_site
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"1e56902c88fe060837c1ba2bb71f63c9b328a67d", @"/Pages/MRP/mas_site/Form.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_MRP_mas_site_Form : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "1e56902c88fe060837c1ba2bb71f63c9b328a67d4564", async() => {
                WriteLiteral(@"
    <div class=""modal effect-flip-vertical"" id=""modal-frm_data"" data-keyboard=""false"" data-backdrop=""static"">
        <div class=""modal-dialog modal-dialog-scrollable modal-dialog-centered"" role=""document"" style=""max-width:990px"">
            <div class=""modal-content modal-content-demo"">
                <div class=""modal-header"">
                    <h6 class=""modal-title"">");
#nullable restore
#line 7 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\MRP\mas_site\Form.cshtml"
                                       Write(ViewData["Content-Title-Page"]);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" Form</h6><button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">

                    <div class=""form-group row"">
                        <label for=""site_code"" class=""col-sm-2 col-form-label"">Site Code (AX) <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-4"">
                            <select class=""form-control select2"" id=""site_code"" name=""site_code"" data-width=""100%"" required>
                                ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "1e56902c88fe060837c1ba2bb71f63c9b328a67d6112", async() => {
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
                        <label for=""contact_name"" class=""col-sm-2 col-form-label"">Contact Name</label>
                        <div class=""col-sm-4"">
                            <input type=""text"" class=""form-control"" id=""site_contact_name"" name=""site_contact_name""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1486, "\"", 1500, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 1501, "\"", 1509, 0);
                EndWriteAttribute();
                WriteLiteral(@" />
                        </div>
                    </div>

                    <div class=""form-group row"">
                        <label for=""site_description"" class=""col-sm-2 col-form-label"">Site Description (AX) <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-4"">
                            <input type=""text"" class=""form-control"" id=""site_description"" name=""site_description""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1938, "\"", 1952, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 1953, "\"", 1961, 0);
                EndWriteAttribute();
                WriteLiteral(@" required readonly>
                        </div>
                        <label for=""contact_email"" class=""col-sm-2 col-form-label"">Contact Email</label>
                        <div class=""col-sm-4"">
                            <input type=""text"" class=""form-control"" id=""site_contact_email"" name=""site_contact_email""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2286, "\"", 2300, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 2301, "\"", 2309, 0);
                EndWriteAttribute();
                WriteLiteral(@" />
                        </div>
                    </div>

                    <div class=""form-group row"">
                        <label for=""acc_hw_code"" class=""col-sm-2 col-form-label"">ACC+ WH Code </label>
                        <div class=""col-sm-4"">
                            <input type=""text"" class=""form-control"" id=""site_acc_hw_code"" name=""site_acc_hw_code""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2692, "\"", 2706, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 2707, "\"", 2715, 0);
                EndWriteAttribute();
                WriteLiteral(@" />
                        </div>
                        <label for=""contact_email"" class=""col-sm-2 col-form-label"">Contact Phone</label>
                        <div class=""col-sm-4"">
                            <input type=""text"" class=""form-control"" id=""site_contact_phone"" name=""site_contact_phone""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3024, "\"", 3038, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 3039, "\"", 3047, 0);
                EndWriteAttribute();
                WriteLiteral(@" />
                        </div>
                    </div>

                    <div class=""form-group row"">
                        <label for=""user_control"" class=""col-sm-2 col-form-label"">User Control </label>
                        <div class=""col-sm-4"">
                            <input type=""text"" class=""form-control"" id=""site_user_control"" name=""site_user_control""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3433, "\"", 3447, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 3448, "\"", 3456, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                        </div>
                        <label for=""lead_time"" class=""col-sm-2 col-form-label"">Lead Time (Day)</label>
                        <div class=""col-sm-4"">
                            <input type=""text"" class=""form-control"" id=""site_lead_time"" name=""site_lead_time""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3753, "\"", 3767, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 3768, "\"", 3776, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n                        </div>\r\n                    </div>\r\n\r\n                    <fieldset class=\"form-group\">\r\n                        <div class=\"row\">\r\n                            <label");
                BeginWriteAttribute("for", " for=\"", 3970, "\"", 3976, 0);
                EndWriteAttribute();
                WriteLiteral(@" class=""col-sm-2 col-form-label"">&nbsp;</label>
                            <div class=""col-sm-4"">&nbsp;</div>
                            <label class=""col-form-label col-sm-2 pt-0"">Source Allowed</label>
                            <div class=""col-sm-4"">
                                <div class=""form-check form-check-inline"">
                                    <input class=""form-check-input site_source_allowed"" type=""radio"" name=""site_source_allowed"" id=""site_source_allowed_yes"" value=""Y"">
                                    <label class=""form-check-label tx-success"" for=""site_source_allowed_yes"">
                                        Yes
                                    </label>
                                </div>
                                <div class=""form-check form-check-inline"">
                                    <input class=""form-check-input site_source_allowed"" type=""radio"" name=""site_source_allowed"" id=""site_source_allowed_no"" value=""N"">
                                ");
                WriteLiteral(@"    <label class=""form-check-label tx-danger"" for=""site_source_allowed_no"">
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <div class=""row"">
                        <div class=""col-sm-6"">
                            <div class=""form-group row"">
                                <label for=""spare_1"" class=""col-sm-4 col-form-label"">Spare 1</label>
                                <div class=""col-sm-8"">
                                    <input type=""text"" class=""form-control"" id=""site_spare_1"" name=""site_spare_1""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 5727, "\"", 5741, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 5742, "\"", 5750, 0);
                EndWriteAttribute();
                WriteLiteral(@" />
                                </div>
                                <label for=""spare_2"" class=""col-sm-4 col-form-label mg-t-15"">Spare 2</label>
                                <div class=""col-sm-8 mg-t-15"">
                                    <input type=""text"" class=""form-control"" id=""site_spare_2"" name=""site_spare_2""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 6083, "\"", 6097, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 6098, "\"", 6106, 0);
                EndWriteAttribute();
                WriteLiteral(@" />
                                </div>
                            </div>
                            <fieldset class=""form-group"">
                                <div class=""row"">

                                    <label class=""col-form-label col-sm-4 pt-0"">Active Status</label>
                                    <div class=""col-sm-8"">
                                        <div class=""form-check form-check-inline"">
                                            <input class=""form-check-input record_status"" type=""radio"" name=""recode_status"" id=""recode_status_yes"" value=""Y"">
                                            <label class=""form-check-label tx-success"" for=""recode_status_yes"">
                                                Enabled
                                            </label>
                                        </div>
                                        <div class=""form-check form-check-inline"">
                                            <input class=""form-check-");
                WriteLiteral(@"input record_status"" type=""radio"" name=""recode_status"" id=""recode_status_no"" value=""N"">
                                            <label class=""form-check-label tx-danger"" for=""recode_status_no"">
                                                Disabled
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div class=""col-sm-6"">
                            <div class=""row"">
                                <label for=""remark"" class=""col-sm-4 col-form-label"">Remark</label>
                                <div class=""col-sm-8"">
                                    <textarea class=""form-control"" id=""site_remark"" name=""site_remark"" rows=""5""></textarea>
                                </div>
                            </div>
                        </div>

                    <");
                WriteLiteral(@"/div>

                    <div class=""modal-footer"">
                        <button id=""btn-save_exit"" class=""btn ripple btn-primary btn-save_form"" data-action=""save_exit"" type=""submit"">Save</button>
                        <button id=""btn-save_new"" class=""btn ripple btn-success btn-save_form"" data-action=""save_new"" type=""submit"">Save & New</button>
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